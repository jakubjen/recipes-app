import { createAction, props } from '@ngrx/store';
import Recipe from 'src/models/Recipe.model';

export const setRecipes = createAction(
	'[Recipes Service] set',
	props<{ recipes: Recipe[] }>()
);
