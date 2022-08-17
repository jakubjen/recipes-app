import { createSelector } from '@ngrx/store';
import Recipe from 'src/models/Recipe.model';
import { AppState } from '../store';
import { RecipesState } from './recipes.reducer';

export const selectRecipesState = (state: AppState) => state.recipes;

export const selectRecipes = createSelector(
	selectRecipesState,
	(state: RecipesState) => state.recipes
);
