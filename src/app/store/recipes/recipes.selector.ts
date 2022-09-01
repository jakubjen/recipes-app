import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../store';
import {
	RecipesState,
	selectAllRecipes,
	selectRecipeEntities,
} from './recipes.reducer';

const selectRecipesState = createFeatureSelector<AppState, RecipesState>(
	'recipes'
);

const selectAll = createSelector(selectRecipesState, selectAllRecipes);

const selectDataState = createSelector(
	selectRecipesState,
	state => state.dataState
);

const selectById = (recipeId: string) =>
	createSelector(selectAll, recipes =>
		recipes.find(recipe => recipe.id === recipeId)
	);

const RecipesSelectors = {
	selectRecipesState,
	selectAll,
	selectDataState,
	selectById,
};
export default RecipesSelectors;
