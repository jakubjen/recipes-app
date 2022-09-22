import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import DataState from '@models/data-store.enum';
import Recipe, { NewRecipe } from '@models/recipe.model';
import { SnackbarVariant } from '@models/snackbar.model';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { userSelectors } from '@store/auth/selectors';
import RecipesActions from '@store/recipes/recipes.actions';
import RecipesSelectors from '@store/recipes/recipes.selector';
import SnackbarActions from '@store/shared/snackbar.actions';
import { AppState } from '@store/store';
import {
	filter,
	Observable,
	Subject,
	takeUntil,
	tap,
	withLatestFrom,
} from 'rxjs';

@Component({
	selector: 'app-recipes-edit',
	templateUrl: './recipes-edit.component.html',
	styleUrls: ['./recipes-edit.component.scss'],
})
export class RecipesEditComponent implements OnInit, OnDestroy {
	public recipe?: Recipe;
	public processingData$?: Observable<boolean | undefined>;
	private ngDestroyed$ = new Subject();
	public recipeStatues: 'unedited' | 'edited' = 'unedited';
	@HostListener('window:beforeunload')
	canDeactivate(): Observable<boolean> | boolean {
		return this.recipeStatues === 'unedited';
	}
	constructor(
		private route: ActivatedRoute,
		private store: Store<AppState>,
		private router: Router,
		private translate: TranslateService
	) {}

	ngOnInit(): void {
		const id = this.route.snapshot.paramMap.get('id')!;
		this.processingData$ = this.store.select(
			RecipesSelectors.selectProcessingData
		);
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

	public async update({
		recipe,
		image,
	}: {
		recipe: NewRecipe;
		image?: File | null;
	}): Promise<void> {
		this.store.dispatch(
			RecipesActions.updateRecipe({ recipe: recipe as Recipe, image })
		);
	}
}
