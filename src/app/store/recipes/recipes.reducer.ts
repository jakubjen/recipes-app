import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, select, on } from '@ngrx/store';
import Recipe from '@models/recipe.model';
import RecipesActions from './recipes.actions';
import DataState from '@models/data-store.enum';

export interface RecipesState extends EntityState<Recipe> {
	dataState: DataState;
}
const adapter: EntityAdapter<Recipe> = createEntityAdapter<Recipe>();
const initialState = adapter.getInitialState({
	dataState: DataState.BeforeLoad,
});
export const recipesReducer = createReducer(
	{ ...initialState },

	on(RecipesActions.loadRecipesStart, (state: RecipesState): RecipesState => {
		return { ...state, dataState: DataState.Loading };
	}),

	on(RecipesActions.loadRecipesSuccess, (state: RecipesState): RecipesState => {
		return { ...state, dataState: DataState.Loaded };
	}),

	on(RecipesActions.loadRecipesFailed, (state: RecipesState): RecipesState => {
		return { ...state, dataState: DataState.Error };
	}),

	on(RecipesActions.firestoreAddRecipe, (state: RecipesState, { recipe }) => {
		return adapter.addOne(recipe, state);
	}),

	on(
		RecipesActions.firestoreModifyRecipe,
		(state: RecipesState, { recipe }) => {
			return adapter.setOne(recipe, state);
		}
	),

	on(RecipesActions.firestoreRemoveRecipe, (state: RecipesState, { id }) => {
		return adapter.removeOne(id, state);
	})
);

const { selectIds, selectEntities, selectAll, selectTotal } =
	adapter.getSelectors();

export const selectRecipeIds = selectIds;
export const selectRecipeEntities = selectEntities;
export const selectAllRecipes = selectAll;
export const selectRecipeTotal = selectTotal;
