import {
	IngredientsInStore,
	IngredientsSortBy,
} from '@models/ingredients.model';
import SortDirection from '@models/sort-direction.ts';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../store';
import {
	selectAllIngredients,
	ShoppingListState,
} from './shopping-list.reducer';

// eslint-disable-next-line @ngrx/prefer-one-generic-in-create-for-feature-selector
const selectShoppingListState =
	createFeatureSelector<ShoppingListState>('shoppingList');

const selectAll = createSelector(selectShoppingListState, selectAllIngredients);

const selectDataState = createSelector(
	selectShoppingListState,
	state => state.dataState
);

const selectSortedKey = createSelector(
	selectShoppingListState,
	state => state.sortKey
);

const selectSortDirection = createSelector(
	selectShoppingListState,
	state => state.sortDirection
);

const selectQueryString = createSelector(
	selectShoppingListState,
	state => state.queryString
);
const selectFilteredIngredients = createSelector(
	selectAll,
	selectQueryString,
	(ingredients, queryString) => {
		return ingredients.filter(ingredient =>
			ingredient.name.toLowerCase().includes(queryString)
		);
	}
);

const selectFilteredAndSortedIngredients = createSelector(
	selectFilteredIngredients,
	selectSortedKey,
	selectSortDirection,
	(ingredients: IngredientsInStore[], sortKey, direction) => {
		const sortDirection = direction === SortDirection.ASC ? 1 : -1;
		switch (sortKey) {
			case IngredientsSortBy.Name:
				return ingredients.sort((a, b) =>
					a.name.toLowerCase() > b.name.toLowerCase()
						? sortDirection
						: -sortDirection
				);
			case IngredientsSortBy.Amount:
				return ingredients.sort((a, b) => {
					if (a.unit === b.unit)
						return +a.amount > +b.amount ? sortDirection : -sortDirection;
					return a.unit > b.unit ? sortDirection : -sortDirection;
				});
		}
	}
);

const ShoppingListSelectors = {
	selectShoppingListState,
	selectAll,
	selectDataState,
	selectFilteredIngredients,
	selectQueryString,
	selectFilteredAndSortedIngredients,
	selectSortedKey,
	selectSortDirection,
};
export default ShoppingListSelectors;
