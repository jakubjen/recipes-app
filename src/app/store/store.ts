import { RecipesState } from './recipes/recipes.reducer';
import { ShoppingListState } from './shopping-list/shopping-list.reducer';

export interface AppState {
	recipes: RecipesState;
	shoppingList: ShoppingListState;
}
