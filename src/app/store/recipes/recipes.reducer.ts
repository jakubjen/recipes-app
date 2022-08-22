import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, select, on } from '@ngrx/store';
import Recipe from '@models/Recipe.model';
import RecipesActions from './recipes.actions';

export interface RecipesState extends EntityState<Recipe> {
	loadingIsCompleted: boolean;
}
const adapter: EntityAdapter<Recipe> = createEntityAdapter<Recipe>();
const initialState = adapter.getInitialState({
	loadingIsCompleted: false,
});
export const recipesReducer = createReducer(
	initialState,
	on(RecipesActions.loadRecipes, (state: RecipesState): RecipesState => {
		return { ...state, loadingIsCompleted: false };
	}),
	on(RecipesActions.loadRecipesSuccess, (state: RecipesState, { recipes }) => {
		return adapter.setAll(recipes, { ...state, loadingIsCompleted: true });
	})
);

const { selectIds, selectEntities, selectAll, selectTotal } =
	adapter.getSelectors();

export const selectRecipeIds = selectIds;
export const selectRecipeEntities = selectEntities;
export const selectAllRecipes = selectAll;
export const selectRecipeTotal = selectTotal;
