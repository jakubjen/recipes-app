import { Injectable } from '@angular/core';
import { IngredientsInStore } from '@models/ingredients.model';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { State, Store } from '@ngrx/store';
import { AppState } from '@store/store';
import { combineLatest, concatMap, map } from 'rxjs';
import { shoppingListActions } from './shopping-list.actions';
import ShoppingListSelectors from './shopping-list.selectors';

@Injectable()
export class shoppingListEffects {
	saveList$ = createEffect(
		() => {
			return this.actions$.pipe(
				ofType(
					shoppingListActions.addIngredient,
					shoppingListActions.removeIngredient,
					shoppingListActions.updateIngredient
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
	constructor(private actions$: Actions, private store: Store<AppState>) {}
}
