import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, select, on } from '@ngrx/store';
import Recipe from 'src/models/Recipe.model';
import { RecipesActions } from '.';

export interface RecipesState extends EntityState<Recipe> {}
const adapter: EntityAdapter<Recipe> = createEntityAdapter<Recipe>();
const initialState = adapter.getInitialState({});
export const recipesReducer = createReducer(
	initialState,
	on(RecipesActions.loadRecipesSuccess, (state: RecipesState, { recipes }) => {
		return adapter.setAll(recipes, state);
	})
);

const { selectIds, selectEntities, selectAll, selectTotal } =
	adapter.getSelectors();

export const selectRecipeIds = selectIds;
export const selectRecipeEntities = selectEntities;
export const selectAllRecipes = selectAll;
export const selectRecipeTotal = selectTotal;