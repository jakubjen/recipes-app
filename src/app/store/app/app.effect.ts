import { Injectable } from '@angular/core';
import { AppLanguage } from '@models/app-language.model';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TranslateService } from '@ngx-translate/core';
import userActions from '@store/auth/user.actions';
import RecipesActions from '@store/recipes/recipes.actions';
import { map } from 'rxjs';
import appActions from './app.actions';

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
	changeLanguage$ = createEffect(
		() => {
			return this.actions$.pipe(
				ofType(appActions.changeLanguage),
				map(action => {
					this.translate.use(action.language.shortName);
					localStorage.setItem(
						'currentLanguage',
						JSON.stringify(action.language)
					);
				})
			);
		},
		{ dispatch: false }
	);

	setLanguageOnAppInit$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(appActions.appInit),
			map(() => {
				const dataFromLocalStorage = localStorage.getItem('currentLanguage');
				if (!dataFromLocalStorage)
					return appActions.changeLanguageOnInitFailed();
				const language: AppLanguage = JSON.parse(dataFromLocalStorage);
				return appActions.changeLanguage({ language });
			})
		);
	});
	constructor(private actions$: Actions, private translate: TranslateService) {}
}
