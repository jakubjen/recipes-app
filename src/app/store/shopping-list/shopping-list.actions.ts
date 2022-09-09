import Ingredients, { IngredientsInStore } from '@models/ingredients.model';
import { createAction, props } from '@ngrx/store';

const addIngredient = createAction(
	'[ShoppingList page] add ingredient',
	props<{ ingredient: Ingredients }>()
);

const removeIngredient = createAction(
	'[ShoppingList page] remove ingredient',
	props<{ id: string }>()
);

const updateIngredient = createAction(
	'[ShoppingList page] update ingredient',
	props<{ ingredient: IngredientsInStore }>()
);

const loadIngredients = createAction('[App component] load ingredients');

const loadIngredientsSuccess = createAction(
	'[App component] load ingredients success',
	props<{ ingredients: IngredientsInStore[] }>()
);

const addIngredientFromRecipe = createAction(
	'[Recipe page] Add ingredient from recipe',
	props<{ ingredient: Ingredients }>()
);

const addManyIngredientsFromRecipe = createAction(
	'[Recipe page] Add ingredients from recipe',
	props<{ ingredients: Ingredients[] }>()
);

const setQueryString = createAction(
	'[ShoppingList page] Add setQueryString',
	props<{ queryString: string }>()
);

export const shoppingListActions = {
	addIngredient,
	removeIngredient,
	updateIngredient,
	loadIngredients,
	loadIngredientsSuccess,
	addIngredientFromRecipe,
	addManyIngredientsFromRecipe,
	setQueryString,
};
