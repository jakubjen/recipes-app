import { createAction, props } from '@ngrx/store';
import Recipe, { NewRecipe } from '@models/recipe.model';

const loadRecipesStart = createAction('[Router] Start recipes');

const loadRecipesSuccess = createAction('[Router] Load recipes success');

const loadRecipesFailed = createAction('[Router] Load recipes failed');

const serviceAddRecipe = createAction(
	'[RecipeService] Add recipe',
	props<{ recipe: Recipe }>()
);

const serviceModifyRecipe = createAction(
	'[Firestore] Recipe modified',
	props<{ recipe: Recipe }>()
);

const serviceRemoveRecipe = createAction(
	'[Firestore] Recipe removed',
	props<{ id: string }>()
);

const addRecipe = createAction(
	'[Add recipe] Add recipe',
	props<{ recipe: NewRecipe }>()
);

const RecipesActions = {
	loadRecipesStart,
	loadRecipesSuccess,
	loadRecipesFailed,
	serviceAddRecipe,
	serviceRemoveRecipe,
	serviceModifyRecipe,
	addRecipe,
};

export default RecipesActions;
