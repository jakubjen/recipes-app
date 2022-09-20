import { transition } from '@angular/animations';
import { Injectable } from '@angular/core';
import Ingredients, { IngredientsInStore } from '@models/ingredients.model';
import { SnackbarVariant } from '@models/snackbar.model';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { State, Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { IngredientsService } from '@services/ingredients/ingredients.service';
import SnackbarActions from '@store/shared/snackbar.actions';
import { AppState } from '@store/store';
import { combineLatest, concatMap, map, tap } from 'rxjs';
import { shoppingListActions } from './shopping-list.actions';
import ShoppingListSelectors from './shopping-list.selectors';

@Injectable()
export class shoppingListEffects {
	saveList$ = createEffect(
		() => {
			return this.actions$.pipe(
				ofType(
					shoppingListActions.addIngredient,
					shoppingListActions.addManyIngredientsFromRecipeAfterGrouping,
					shoppingListActions.addIngredientAfterGrouping,
					shoppingListActions.removeIngredient,
					shoppingListActions.updateIngredientSuccess
				),
				concatLatestFrom(() =>
					this.store.select(ShoppingListSelectors.selectAll)
				),
				map(([_, ingredients]) => {
					const serializeIngredients = JSON.stringify(ingredients);
					localStorage.setItem('ingredients', serializeIngredients);
				})
			);
		},
		{ dispatch: false }
	);

	load$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(shoppingListActions.loadIngredients),
			map(() => {
				const serializeIngredients = localStorage.getItem('ingredients') ?? '';
				const ingredients = JSON.parse(
					serializeIngredients
				) as IngredientsInStore[];
				return shoppingListActions.loadIngredientsSuccess({ ingredients });
			})
		);
	});

	addIngredientsFromRecipe = createEffect(() => {
		return this.actions$.pipe(
			ofType(shoppingListActions.addManyIngredientsFromRecipe),
			concatLatestFrom(() =>
				this.store.select(ShoppingListSelectors.selectAll)
			),
			map(([action, ingredientInShoppingList]) => {
				let ingredientsToStore: IngredientsInStore[] = ingredientInShoppingList;
				action.ingredients.forEach((ingredient: Ingredients) => {
					ingredientsToStore = this.ingredientService.addIngredientAndGroupe(
						ingredient,
						ingredientsToStore
					);
				});

				return shoppingListActions.addManyIngredientsFromRecipeAfterGrouping({
					ingredients: ingredientsToStore,
				});
			})
		);
	});

	addIngredientsFromRecipeAfterGroupe$ing = createEffect(() => {
		return this.actions$.pipe(
			ofType(shoppingListActions.addManyIngredientsFromRecipeAfterGrouping),
			map(() =>
				SnackbarActions.createSnackbar({
					variant: SnackbarVariant.Success,
					text: this.translate.instant('App.Snackbar.AllIngredientsAdded'),
				})
			)
		);
	});

	addIngredientFromRecipe = createEffect(() => {
		return this.actions$.pipe(
			ofType(shoppingListActions.addIngredientFromRecipe),
			concatLatestFrom(() =>
				this.store.select(ShoppingListSelectors.selectAll)
			),
			map(([action, ingredientInShoppingList]) => {
				const ingredientsToStore: IngredientsInStore[] =
					this.ingredientService.addIngredientAndGroupe(
						action.ingredient,
						ingredientInShoppingList
					);

				return shoppingListActions.addIngredientFromRecipeAfterGrouping({
					ingredients: ingredientsToStore,
				});
			})
		);
	});

	addIngredientFromRecipeAfterGrouping$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(shoppingListActions.addIngredientFromRecipeAfterGrouping),
			map(() =>
				SnackbarActions.createSnackbar({
					variant: SnackbarVariant.Success,
					text: this.translate.instant('App.Snackbar.IngredientAdded'),
				})
			)
		);
	});

	addIngredient$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(shoppingListActions.addIngredient),
			concatLatestFrom(() =>
				this.store.select(ShoppingListSelectors.selectAll)
			),
			map(([action, ingredientInShoppingList]) => {
				const ingredientsToStore: IngredientsInStore[] =
					this.ingredientService.addIngredientAndGroupe(
						action.ingredient,
						ingredientInShoppingList
					);

				return shoppingListActions.addIngredientAfterGrouping({
					ingredients: ingredientsToStore,
				});
			})
		);
	});

	addIngredientAfterGrouping$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(shoppingListActions.addIngredient),
			map(() =>
				SnackbarActions.createSnackbar({
					variant: SnackbarVariant.Success,
					text: this.translate.instant('App.Snackbar.IngredientAdded'),
				})
			)
		);
	});

	updateIngredientsFromRecipe = createEffect(() => {
		return this.actions$.pipe(
			ofType(shoppingListActions.updateIngredient),
			concatLatestFrom(() =>
				this.store.select(ShoppingListSelectors.selectAll)
			),
			map(([action, ingredientInShoppingList]) => {
				let ingredientsToStore = ingredientInShoppingList;
				const { ingredient, previewIngredient } = action;

				ingredientsToStore = ingredientsToStore.filter(
					ingredient => ingredient !== previewIngredient
				);

				ingredientsToStore = this.ingredientService.addIngredientAndGroupe(
					ingredient,
					ingredientsToStore
				);

				return shoppingListActions.updateIngredientSuccess({
					ingredients: ingredientsToStore,
				});
			})
		);
	});

	constructor(
		private actions$: Actions,
		private store: Store<AppState>,
		private translate: TranslateService,
		private ingredientService: IngredientsService
	) {}
}
