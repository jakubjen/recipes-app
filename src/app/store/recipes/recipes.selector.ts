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

const RecipesSelectors = {
	selectAll,
	selectDataState,
};
export default RecipesSelectors;
