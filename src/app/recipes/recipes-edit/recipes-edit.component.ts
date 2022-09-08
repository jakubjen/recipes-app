import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import DataState from '@models/data-store.enum';
import Recipe, { NewRecipe } from '@models/recipe.model';
import { Store } from '@ngrx/store';
import RecipesSelectors from '@store/recipes/recipes.selector';
import { AppState } from '@store/store';
import { tap, takeUntil, filter, withLatestFrom, Subject } from 'rxjs';
import { AuthService } from '@services/auth/auth.service';
import { SnackbarVariant } from '@models/snackbar.model';
import { TranslateService } from '@ngx-translate/core';
import SnackbarActions from '@store/shared/snackbar.actions';
import RecipesActions from '@store/recipes/recipes.actions';
import { userSelectors } from '@store/auth/selectors';

@Component({
	selector: 'app-recipes-edit',
	templateUrl: './recipes-edit.component.html',
	styleUrls: ['./recipes-edit.component.scss'],
})
export class RecipesEditComponent implements OnInit, OnDestroy {
	public recipe?: Recipe;
	private ngDestroyed$ = new Subject();

	constructor(
		private route: ActivatedRoute,
		private store: Store<AppState>,
		private router: Router,
		private authService: AuthService,
		private translate: TranslateService
	) {}

	ngOnInit(): void {
		const id = this.route.snapshot.paramMap.get('id')!;
		this.store
			.select(RecipesSelectors.selectDataState)
			.pipe(
				takeUntil(this.ngDestroyed$),
				filter((state: DataState) => state === DataState.Loaded),
				withLatestFrom(
					this.store.select(RecipesSelectors.selectById(id)),
					this.store.select(userSelectors.selectUser)
				),
				tap(([_, recipe, user]) => {
					if (!recipe) return this.router.navigate(['/404']);
					if (user?.uid !== recipe.ownerId) {
						this.store.dispatch(
							SnackbarActions.createSnackbar({
								variant: SnackbarVariant.Error,
								text: this.translate.instant('App.Snackbar.EditNotAllowed'),
							})
						);
						return this.router.navigate(['/recipe', recipe.id]);
					}
					return;
				})
			)
			.subscribe(([_, recipe, user]) => {
				this.recipe = recipe;
			});
	}

	public ngOnDestroy(): void {
		this.ngDestroyed$.next('');
		this.ngDestroyed$.complete();
	}

	public update(recipe: NewRecipe): void {
		if (!recipe.id) return;
		this.store.dispatch(
			RecipesActions.updateRecipe({ recipe: recipe as Recipe })
		);
	}
}
