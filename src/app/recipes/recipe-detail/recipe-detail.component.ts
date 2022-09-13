import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, Subject, takeUntil, tap, withLatestFrom } from 'rxjs';
import Recipe from '@models/recipe.model';
import { Store } from '@ngrx/store';
import { AppState } from '@store/store';
import RecipesSelectors from '@store/recipes/recipes.selector';
import DataState from '@models/data-store.enum';
import { shoppingListActions } from '@store/shopping-list/shopping-list.actions';
import Ingredients from '@models/ingredients.model';
import RecipesActions from '@store/recipes/recipes.actions';
import { userSelectors } from '@store/auth/selectors';
import { User } from '@models/user.model';
import SnackbarActions from '@store/shared/snackbar.actions';
import { SnackbarVariant } from '@models/snackbar.model';
import { TranslateService } from '@ngx-translate/core';

@Component({
	selector: 'app-recipe-detail',
	templateUrl: './recipe-detail.component.html',
	styleUrls: ['./recipe-detail.component.scss'],
})
export class RecipeDetailComponent implements OnInit, OnDestroy {
	public recipe?: Recipe;
	private ngDestroyed$ = new Subject();
	public user?: User;
	constructor(
		private route: ActivatedRoute,
		private store: Store<AppState>,
		private router: Router,
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
				tap(async ([_, recipe, user]) => {
					if (!recipe) this.router.navigate(['/404']);
				})
			)
			.subscribe(([_, recipe, user]) => {
				this.recipe = recipe;
				this.user = user;
			});
	}

	public addAllIngredientsToShippingList(ingredients: Ingredients[]): void {
		this.store.dispatch(
			shoppingListActions.addManyIngredientsFromRecipe({
				ingredients,
			})
		);
	}

	public addIngredientToShippingList(ingredient: Ingredients): void {
		this.store.dispatch(
			shoppingListActions.addIngredientFromRecipe({
				ingredient,
			})
		);
	}

	public deleteRecipe(id: string): void {
		this.store.dispatch(RecipesActions.removeRecipe({ id }));
	}

	public ngOnDestroy(): void {
		this.ngDestroyed$.next('');
		this.ngDestroyed$.complete();
	}
}
