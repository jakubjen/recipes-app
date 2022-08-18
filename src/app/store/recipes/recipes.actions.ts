import { createAction, props } from '@ngrx/store';
import Recipe from 'src/models/Recipe.model';

export const loadRecipes = createAction('[Router] Load recipes');
export const loadRecipesSuccess = createAction(
	'[Router] Load recipes success',
	props<{ recipes: Recipe[] }>()
);
export const loadRecipesFailed = createAction('[Router] Load recipes failed');
