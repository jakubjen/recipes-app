import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, select, on } from '@ngrx/store';
import Recipe from '@models/recipe.model';
import RecipesActions from './recipes.actions';
import dataState from 'src/app/enums/data-store.enum';

export interface RecipesState extends EntityState<Recipe> {
	dataState: dataState;
}
const adapter: EntityAdapter<Recipe> = createEntityAdapter<Recipe>();
const initialState = adapter.getInitialState({
	dataState: dataState.beforeLoad,
});
export const recipesReducer = createReducer(
	{ ...initialState },

	on(RecipesActions.loadRecipesStart, (state: RecipesState): RecipesState => {
		return { ...state, dataState: dataState.loading };
	}),

	on(RecipesActions.loadRecipesSuccess, (state: RecipesState): RecipesState => {
		return { ...state, dataState: dataState.loaded };
	}),

	on(RecipesActions.loadRecipesFailed, (state: RecipesState): RecipesState => {
		return { ...state, dataState: dataState.error };
	}),

	on(RecipesActions.serviceAddRecipe, (state: RecipesState, { recipe }) => {
		return adapter.addOne(recipe, state);
	}),

	on(RecipesActions.serviceModifyRecipe, (state: RecipesState, { recipe }) => {
		return adapter.setOne(recipe, state);
	}),

	on(RecipesActions.serviceRemoveRecipe, (state: RecipesState, { id }) => {
		return adapter.removeOne(id, state);
	})
);

const { selectIds, selectEntities, selectAll, selectTotal } =
	adapter.getSelectors();

export const selectRecipeIds = selectIds;
export const selectRecipeEntities = selectEntities;
export const selectAllRecipes = selectAll;
export const selectRecipeTotal = selectTotal;
