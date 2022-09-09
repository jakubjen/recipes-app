import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import DataState from '@models/data-store.enum';
import { IngredientsInStore } from '@models/ingredients.model';
import { shoppingListActions } from './shopping-list.actions';
import { v4 as uuidv4 } from 'uuid';

export interface ShoppingListState extends EntityState<IngredientsInStore> {
	dataState: DataState;
	queryString: string;
}
const adapter: EntityAdapter<IngredientsInStore> =
	createEntityAdapter<IngredientsInStore>();
const initialState = adapter.getInitialState({
	dataState: DataState.Loaded,
	queryString: '',
});
export const ShoppingListReducer = createReducer(
	{ ...initialState },
	on(
		shoppingListActions.addIngredient,
		(state: ShoppingListState, { ingredient }): ShoppingListState => {
			const ingredientToStore: IngredientsInStore = {
				id: uuidv4(),
				...ingredient,
			};
			return adapter.addOne(ingredientToStore, state);
		}
	),

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
	)
);

const { selectIds, selectEntities, selectAll, selectTotal } =
	adapter.getSelectors();

export const selectIngredientIds = selectIds;
export const selectIngredientEntities = selectEntities;
export const selectAllIngredients = selectAll;
export const selectIngredientTotal = selectTotal;
