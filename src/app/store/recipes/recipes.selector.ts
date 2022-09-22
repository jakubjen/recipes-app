import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../store';
import { RecipesState, selectAllRecipes } from './recipes.reducer';

const selectRecipesState = createFeatureSelector<AppState, RecipesState>(
	'recipes'
);

const selectAll = createSelector(selectRecipesState, selectAllRecipes);

const selectDataState = createSelector(
	selectRecipesState,
	state => state.dataState
);

const selectProcessingData = createSelector(
	selectRecipesState,
	state => state.processingData
);

const selectById = (recipeId: string) =>
	createSelector(selectAll, recipes =>
		recipes.find(recipe => recipe.id === recipeId)
	);

const RecipesSelectors = {
	selectRecipesState,
	selectAll,
	selectDataState,
	selectProcessingData,
	selectById,
};
export default RecipesSelectors;
