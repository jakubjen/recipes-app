import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../store';
import { RecipesState, selectAllRecipes } from './recipes.reducer';

const selectRecipesState = createFeatureSelector<AppState, RecipesState>(
	'recipes'
);

const selectRecipes = createSelector(selectRecipesState, selectAllRecipes);

const selectRecipesAreLoaded = createSelector(
	selectRecipesState,
	(state: RecipesState) => state.recipesAreLoaded
);

const RecipesSelectors = { selectRecipes, selectRecipesAreLoaded };
export default RecipesSelectors;
