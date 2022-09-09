import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../store';
import {
	selectAllIngredients,
	ShoppingListState,
} from './shopping-list.reducer';

const selectShoppingListState = createFeatureSelector<
	AppState,
	ShoppingListState
>('shoppingList');

const selectAll = createSelector(selectShoppingListState, selectAllIngredients);

const selectDataState = createSelector(
	selectShoppingListState,
	state => state.dataState
);

const selectQueryString = createSelector(
	selectShoppingListState,
	state => state.queryString
);
const selectIngredients = createSelector(
	selectAll,
	selectQueryString,
	(ingredients, queryString) => {
		return ingredients.filter(ingredient =>
			ingredient.name.toLowerCase().includes(queryString)
		);
	}
);

const ShoppingListSelectors = {
	selectShoppingListState,
	selectAll,
	selectDataState,
	selectIngredients,
	selectQueryString,
};
export default ShoppingListSelectors;
