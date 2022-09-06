import { createAction, props } from '@ngrx/store';
import Recipe from '@models/recipe.model';

const loadRecipesStart = createAction('[App component] Start recipes');

const loadRecipesSuccess = createAction('[App component] Load recipes success');

const loadRecipesFailed = createAction('[App component] Load recipes failed');

const firestoreAddRecipe = createAction(
	'[firestore] Add recipe',
	props<{ recipe: Recipe }>()
);

const firestoreModifyRecipe = createAction(
	'[Firestore] Recipe modified',
	props<{ recipe: Recipe }>()
);

const firestoreRemoveRecipe = createAction(
	'[Firestore] Recipe removed',
	props<{ id: string }>()
);

const addRecipe = createAction(
	'[Add recipe] Add recipe',
	props<{ recipe: Recipe }>()
);

const RecipesActions = {
	loadRecipesStart,
	loadRecipesSuccess,
	loadRecipesFailed,
	firestoreAddRecipe,
	firestoreRemoveRecipe,
	firestoreModifyRecipe,
	addRecipe,
};

export default RecipesActions;
