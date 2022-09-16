import Ingredients, {
	IngredientsInStore,
	IngredientsSortBy,
} from '@models/ingredients.model';
import SortDirection from '@models/sort-direction.ts';
import { createAction, props } from '@ngrx/store';

const addIngredient = createAction(
	'[ShoppingList page] add ingredient',
	props<{ ingredient: Ingredients }>()
);

const addIngredientAfterGrouping = createAction(
	'[ShoppingList page] add ingredient after grouping',
	props<{ ingredients: IngredientsInStore[] }>()
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

const addIngredientFromRecipeAfterGrouping = createAction(
	'[Recipe page] Add ingredient from recipe after grouping',
	props<{ ingredients: IngredientsInStore[] }>()
);

const addManyIngredientsFromRecipeAfterGrouping = createAction(
	'[Recipe page] Add ingredients from recipe after grouping',
	props<{ ingredients: IngredientsInStore[] }>()
);

const addManyIngredientsFromRecipe = createAction(
	'[Recipe page] Add ingredients from recipe',
	props<{ ingredients: Ingredients[] }>()
);

const setQueryString = createAction(
	'[ShoppingList page] Add setQueryString',
	props<{ queryString: string }>()
);

const setSortDirection = createAction(
	'[ShoppingList table] Set sort direction',
	props<{ sortDirection: SortDirection }>()
);

const setSortKey = createAction(
	'[ShoppingList table] Set sort key',
	props<{ sortKey: IngredientsSortBy }>()
);

const toggleDirection = createAction('[ShoppingList table] Table direction');

export const shoppingListActions = {
	addIngredient,
	removeIngredient,
	updateIngredient,
	loadIngredients,
	loadIngredientsSuccess,
	addIngredientFromRecipe,
	addManyIngredientsFromRecipeAfterGrouping,
	addIngredientFromRecipeAfterGrouping,
	setQueryString,
	setSortDirection,
	toggleDirection,
	setSortKey,
	addIngredientAfterGrouping,
	addManyIngredientsFromRecipe,
};
