import { UserState } from './auth/auth.reducer';
import { RecipesState } from './recipes/recipes.reducer';
import { SnackbarState } from './shared/snackbar.reducer';
import { ShoppingListState } from './shopping-list/shopping-list.reducer';

export interface AppState {
	recipes: RecipesState;
	snackbar: SnackbarState;
	user: UserState;
}
