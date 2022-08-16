import { createReducer, on } from '@ngrx/store';
import Recipe from 'src/models/Recipe.model';
import { updateRecipes } from './recipes.actions';

export interface RecipesState {
	recipes: Recipe[];
}
export const initialState: RecipesState = { recipes: [] };
export const recipesReducer = createReducer(
	initialState,
	on(
		updateRecipes,
		(state, { recipes }): RecipesState => ({
			...state,
			recipes: recipes,
		})
	)
);
