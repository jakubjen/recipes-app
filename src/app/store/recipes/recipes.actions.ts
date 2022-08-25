import { createAction, props } from '@ngrx/store';
import Recipe from '@models/recipe.model';
import { Update } from '@ngrx/entity';
import { DocumentChangeType } from '@angular/fire/compat/firestore';

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

const RecipesActions = {
	loadRecipesStart,
	loadRecipesSuccess,
	loadRecipesFailed,
	serviceAddRecipe,
	serviceRemoveRecipe,
	serviceModifyRecipe,
};

export default RecipesActions;
