import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { RecipesService } from '@services/recipes/recipes.service';
import { map } from 'rxjs';
import RecipesActions from '../recipes.actions';

@Injectable()
export class addRecipeEffect {
	loadRecipes$ = createEffect(
		() => {
			return this.actions$.pipe(
				ofType(RecipesActions.addRecipe),
				map(action => {
					this.recipeService.addRecipe(action.recipe);
				})
			);
		},
		{ dispatch: false }
	);
	constructor(
		private actions$: Actions,
		private recipeService: RecipesService
	) {}
}
