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

const ShoppingListSelectors = {
	selectShoppingListState,
	selectAll,
	selectDataState,
};
export default ShoppingListSelectors;
