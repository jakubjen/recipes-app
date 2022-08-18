import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, mergeMap, of, switchMap } from 'rxjs';
import { RecipesService } from '../recipes/services/recipes-service';
import { RecipesActions } from './recipes';

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
