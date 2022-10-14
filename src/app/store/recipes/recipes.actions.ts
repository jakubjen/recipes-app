import { createAction, props } from '@ngrx/store';
import Recipe, { NewRecipe } from '@models/recipe.model';

const loadRecipesStart = createAction('[App component] Start recipes');

const loadRecipesSuccess = createAction('[App component] Load recipes success');

const loadRecipesFailed = createAction('[App component] Load recipes failed');

const addRecipe = createAction(
	'[Add recipe component] Add recipe',
	props<{ recipe: NewRecipe; image: Blob }>()
);

const addRecipeSuccess = createAction(
	'[Add recipe component] Add recipe success'
);

const addRecipeFailed = createAction(
	'[Add recipe component] Add recipe failed',
	props<{ text: string }>()
);
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

const removeRecipe = createAction(
	'[Recipe effect] Recipe removed',
	props<{ id: string }>()
);
const removeRecipeSuccess = createAction(
	'[Recipe effect] Recipe removed success'
);

const removeRecipeFailed = createAction(
	'[Recipe effect] Recipe removed failed',
	props<{ text: string }>()
);

const updateRecipe = createAction(
	'[Recipe effect] Recipe update',
	props<{ recipe: Recipe; image?: Blob | null }>()
);

const updateRecipeFailed = createAction(
	'[Recipe effect] Recipe update failed',
	props<{ text: string }>()
);

const updateRecipeSuccess = createAction(
	'[Recipe effect] Recipe update successfully'
);

const RecipesActions = {
	loadRecipesStart,
	loadRecipesSuccess,
	loadRecipesFailed,
	addRecipe,
	addRecipeSuccess,
	addRecipeFailed,
	firestoreAddRecipe,
	firestoreRemoveRecipe,
	firestoreModifyRecipe,
	removeRecipe,
	removeRecipeSuccess,
	removeRecipeFailed,
	updateRecipe,
	updateRecipeSuccess,
	updateRecipeFailed,
};

export default RecipesActions;
