import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../store';
import { RecipesState, selectAllRecipes } from './recipes.reducer';

const selectRecipesState = createFeatureSelector<AppState, RecipesState>(
	'recipes'
);

const selectRecipes = createSelector(selectRecipesState, selectAllRecipes);

const selectLoadingIsComplied = createSelector(
	selectRecipesState,
	(state: RecipesState) => state.loadingIsCompleted
);

const RecipesSelectors = { selectRecipes, selectLoadingIsComplied };
export default RecipesSelectors;
