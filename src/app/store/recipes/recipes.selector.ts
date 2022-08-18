import { createSelector } from '@ngrx/store';
import { AppState } from '../store';
import { selectAllRecipes } from './recipes.reducer';

export const selectRecipesState = (state: AppState) => state.recipes;

export const selectRecipes = createSelector(
	selectRecipesState,
	selectAllRecipes
);
