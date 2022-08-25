import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { RecipesService } from '@services/recipes/recipes.service';
import { map } from 'rxjs';
import RecipesActions from '../recipes.actions';

@Injectable()
export class loadRecipesStartEffect {
	loadRecipes$ = createEffect(
		() => {
			return this.actions$.pipe(
				ofType(RecipesActions.loadRecipesStart),
				map(() => {
					this.recipeService.loadRecipes();
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
