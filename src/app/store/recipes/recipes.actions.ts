import { createAction, props } from '@ngrx/store';
import Recipe from '@models/Recipe.model';

const loadRecipes = createAction('[Router] Load recipes');

const loadRecipesSuccess = createAction(
	'[Router] Load recipes success',
	props<{ recipes: Recipe[] }>()
);

const loadRecipesFailed = createAction('[Router] Load recipes failed');

const RecipesActions = { loadRecipes, loadRecipesSuccess, loadRecipesFailed };

export default RecipesActions;
