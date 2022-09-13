import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map } from 'rxjs';
import appActions from './app.actions';
import userActions from './auth/user.actions';
import RecipesActions from './recipes/recipes.actions';

@Injectable()
export class AppEffects {
	loginOnStartup$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(appActions.appInit),
			map(() => {
				return userActions.loginOnAppInit();
			})
		);
	});
	loadRecipesOnStartup$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(appActions.appInit),
			map(() => {
				return RecipesActions.loadRecipesStart();
			})
		);
	});
	constructor(private actions$: Actions) {}
}
