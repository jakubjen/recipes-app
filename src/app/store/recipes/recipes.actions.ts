import { createAction, props } from '@ngrx/store';
import Recipe from '@models/recipe.model';
import { Update } from '@ngrx/entity';
import { DocumentChangeType } from '@angular/fire/compat/firestore';

const loadRecipes = createAction('[Router] Load recipes');

const loadRecipesSuccess = createAction(
	'[Router] Load recipes success',
	props<{ action: DocumentChangeType; recipe: Recipe }>()
);

const loadRecipesFailed = createAction('[Router] Load recipes failed');

const firestoreAddRecipe = createAction(
	'[Firestore] Add recipe',
	props<{ recipe: Recipe }>()
);

const firestoreModifyRecipe = createAction(
	'[Firestore] Recipe modified',
	props<{ recipe: Recipe }>()
);

const firebaseRemoveRecipe = createAction(
	'[Firestore] Recipe removed',
	props<{ id: string }>()
);

const updateRecipes = createAction(
	'[Firestore] Update recipes',
	props<{ recipe: Update<Recipe> }>()
);

const RecipesActions = {
	loadRecipes,
	loadRecipesSuccess,
	loadRecipesFailed,
	firestoreAddRecipe,
	firebaseRemoveRecipe,
	firestoreModifyRecipe,
};

export default RecipesActions;
