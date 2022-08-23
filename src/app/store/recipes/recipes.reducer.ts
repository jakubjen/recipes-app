import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, select, on } from '@ngrx/store';
import Recipe from '@models/recipe.model';
import RecipesActions from './recipes.actions';

export interface RecipesState extends EntityState<Recipe> {
	recipesAreLoaded: boolean;
}
const adapter: EntityAdapter<Recipe> = createEntityAdapter<Recipe>();
const initialState = adapter.getInitialState({
	recipesAreLoaded: false,
});
export const recipesReducer = createReducer(
	initialState,

	on(RecipesActions.loadRecipesSuccess, (state: RecipesState): RecipesState => {
		return { ...state, recipesAreLoaded: true };
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

	on(RecipesActions.firebaseRemoveRecipe, (state: RecipesState, { recipe }) => {
		return adapter.removeOne(recipe.id, state);
	})
);

const { selectIds, selectEntities, selectAll, selectTotal } =
	adapter.getSelectors();

export const selectRecipeIds = selectIds;
export const selectRecipeEntities = selectEntities;
export const selectAllRecipes = selectAll;
export const selectRecipeTotal = selectTotal;
