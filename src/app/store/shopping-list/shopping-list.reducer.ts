import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import DataState from '@models/data-store.enum';
import {
	IngredientsInStore,
	IngredientsSortBy,
} from '@models/ingredients.model';
import { shoppingListActions } from './shopping-list.actions';
import { v4 as uuidv4 } from 'uuid';
import SortDirection from '@models/sort-direction.ts';

export interface ShoppingListState extends EntityState<IngredientsInStore> {
	dataState: DataState;
	queryString: string;
	sortKey: IngredientsSortBy;
	sortDirection: SortDirection;
}
const adapter: EntityAdapter<IngredientsInStore> =
	createEntityAdapter<IngredientsInStore>();

const initialState = adapter.getInitialState({
	dataState: DataState.Loaded,
	queryString: '',
	sortKey: IngredientsSortBy.Name,
	sortDirection: SortDirection.ASC,
});

export const ShoppingListReducer = createReducer(
	{ ...initialState },

	on(
		shoppingListActions.updateIngredient,
		(state: ShoppingListState, { ingredient }): ShoppingListState => {
			return adapter.setOne(ingredient, state);
		}
	),

	on(
		shoppingListActions.removeIngredient,
		(state: ShoppingListState, { id }): ShoppingListState => {
			return adapter.removeOne(id, state);
		}
	),

	on(
		shoppingListActions.addIngredientAfterGrouping,
		(state: ShoppingListState, { ingredients }): ShoppingListState => {
			return adapter.setAll(ingredients, state);
		}
	),

	on(
		shoppingListActions.loadIngredientsSuccess,
		(state: ShoppingListState, { ingredients }): ShoppingListState => {
			return adapter.addMany(ingredients, state);
		}
	),

	on(
		shoppingListActions.setQueryString,
		(state: ShoppingListState, { queryString }): ShoppingListState => {
			return { ...state, queryString: queryString.toLowerCase() };
		}
	),

	on(
		shoppingListActions.addIngredientFromRecipeAfterGrouping,
		(state: ShoppingListState, { ingredients }): ShoppingListState => {
			return adapter.setAll(ingredients, state);
		}
	),

	on(
		shoppingListActions.addManyIngredientsFromRecipeAfterGrouping,
		(state: ShoppingListState, { ingredients }): ShoppingListState => {
			console.table(ingredients);

			return adapter.setAll(ingredients, state);
		}
	),

	on(
		shoppingListActions.setSortDirection,
		(state: ShoppingListState, { sortDirection }): ShoppingListState => {
			return { ...state, sortDirection };
		}
	),

	on(
		shoppingListActions.setSortKey,
		(state: ShoppingListState, { sortKey }): ShoppingListState => {
			return { ...state, sortKey };
		}
	),

	on(
		shoppingListActions.toggleDirection,
		(state: ShoppingListState): ShoppingListState => {
			const newDirection =
				state.sortDirection === SortDirection.ASC
					? SortDirection.DESC
					: SortDirection.ASC;
			return { ...state, sortDirection: newDirection };
		}
	)
);

const { selectIds, selectEntities, selectAll, selectTotal } =
	adapter.getSelectors();

export const selectIngredientIds = selectIds;
export const selectIngredientEntities = selectEntities;
export const selectAllIngredients = selectAll;
export const selectIngredientTotal = selectTotal;
