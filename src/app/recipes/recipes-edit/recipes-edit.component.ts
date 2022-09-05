import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import DataState from '@models/data-store.enum';
import Recipe, { NewRecipe } from '@models/recipe.model';
import { Store } from '@ngrx/store';
import { RecipesService } from '@services/recipes/recipes.service';
import RecipesSelectors from '@store/recipes/recipes.selector';
import { AppState } from '@store/store';
import { firstValueFrom, Observable, Subscription, tap } from 'rxjs';
import firebase from 'firebase/compat/app';
import { AuthService } from '@services/auth/auth.service';
import { SnackbarService } from '@services/shared/snackbar.service';
import { SnackbarType } from '@models/snackbar.model';
import { TranslateService } from '@ngx-translate/core';

@Component({
	selector: 'app-recipes-edit',
	templateUrl: './recipes-edit.component.html',
	styleUrls: ['./recipes-edit.component.scss'],
})
export class RecipesEditComponent implements OnInit, OnDestroy {
	public recipe$: Observable<Recipe | undefined> | undefined;
	private recipeState$: Observable<DataState> | undefined;
	private isLoadedSubscription?: Subscription;
	constructor(
		private route: ActivatedRoute,
		private store: Store<AppState>,
		private router: Router,
		private recipeService: RecipesService,
		private authService: AuthService,
		private snackbarService: SnackbarService,
		private translate: TranslateService
	) {}

	ngOnInit(): void {
		this.route.paramMap.subscribe((params: ParamMap) => {
			const id = params.get('id')!;
			this.recipeState$ = this.store.select(RecipesSelectors.selectDataState);
			this.isLoadedSubscription = this.recipeState$.subscribe(state => {
				if (state === DataState.Loaded) {
					this.recipe$ = this.store
						.select(RecipesSelectors.selectById(id))
						.pipe(
							tap(async recipe => {
								if (!recipe) this.router.navigate([404]);
								const user = await this.authService.getUser();
								if (recipe?.ownerId !== user?.uid)
									this.snackbarService.addSnackbar(
										SnackbarType.Error,
										await firstValueFrom(
											this.translate.get('App.Snackbar.EditNotAllowed')
										)
									);
								this.router.navigate([`/recipe/${recipe?.id}`]);
							})
						);
				}
			});
		});
	}

	ngOnDestroy(): void {
		if (!this.isLoadedSubscription) return;
		this.isLoadedSubscription.unsubscribe();
	}

	public update(recipe: NewRecipe): void {
		if (!recipe.id) return;
		this.recipeService.update(recipe as Recipe);
	}
}
