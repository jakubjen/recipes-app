import { createAction, props } from '@ngrx/store';
import Recipe from 'src/models/Recipe.model';

export const updateRecipes = createAction(
	'[Recipes Service] update',
	props<{ recipes: Recipe[] }>()
);
