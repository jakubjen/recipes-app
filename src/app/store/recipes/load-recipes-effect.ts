import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { RecipesService } from '@services/recipes/recipes-service';
import { catchError, exhaustMap, map, of } from 'rxjs';
import RecipesActions from './recipes.actions';

@Injectable()
export class loadRecipeEffect {
	loadRecipes$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(RecipesActions.loadRecipes),
			exhaustMap(() => {
				return this.recipesService.fetchRecipes().pipe(
					map(recipes => RecipesActions.loadRecipesSuccess({ recipes })),
					catchError(() => of(RecipesActions.loadRecipesFailed()))
				);
			})
		);
	});
	constructor(
		private actions$: Actions,
		private recipesService: RecipesService
	) {}
}
