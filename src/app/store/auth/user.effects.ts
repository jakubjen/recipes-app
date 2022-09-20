import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SnackbarVariant } from '@models/snackbar.model';
import { User } from '@models/user.model';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '@services/auth/auth.service';
import SnackbarActions from '@store/shared/snackbar.actions';
import { concatMap, firstValueFrom, switchMap } from 'rxjs';
import userActions from './user.actions';

@Injectable()
export class UserEffects {
	constructor(
		private actions$: Actions,
		private authService: AuthService,
		private router: Router,
		private translate: TranslateService
	) {}

	loginWithPassword$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(userActions.loginWithPassword),
			switchMap(async action => {
				const { email, password } = action;
				try {
					const request = await this.authService.loginWithPassword(
						email,
						password
					);
					const user = request.user!;
					const userToStore: User = { uid: user.uid, email: user.email! };
					return userActions.loginSuccess({ user: userToStore });
				} catch (err: any) {
					const errorCode = err.code;
					if (errorCode === 'auth/user-not-found')
						return userActions.loginFailed({
							error: this.translate.instant(
								'App.Snackbar.Error.InvalidEmailOrPassword'
							),
						});
					if (errorCode === 'auth/wrong-password')
						return userActions.loginFailed({
							error: this.translate.instant(
								'App.Snackbar.Error.InvalidEmailOrPassword'
							),
						});
					return userActions.loginFailed({ error: err.message });
				}
			})
		);
	});

	loginWithGoogle$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(userActions.loginWithGoogle),
			switchMap(async () => {
				try {
					const request = await this.authService.loginWithGoogle();
					const user = request.user!;
					const userToStore: User = { uid: user.uid, email: user.email! };
					return userActions.loginSuccess({ user: userToStore });
				} catch (err: any) {
					const errorCode = err.code;
					let errorMessage = '';
					switch (errorCode) {
						case 'auth/popup-closed-by-user':
							errorMessage = 'UserClosePopUpBeforeLoginFinish';
							break;
						case 'auth/popup-blocked':
							errorMessage = 'PopupBlock';
							break;
						default:
							return userActions.loginFailed({
								error: errorCode,
							});
					}

					return userActions.loginFailed({
						error: this.translate.instant(`App.Snackbar.Error.${errorMessage}`),
					});
				}
			})
		);
	});

	loginSuccess$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(userActions.loginSuccess),
			concatMap(async () => {
				this.router.navigate(['/']);
				return SnackbarActions.createSnackbar({
					variant: SnackbarVariant.Success,
					text: this.translate.instant('App.Snackbar.LoginSuccessfully'),
				});
			})
		);
	});

	loginFailed$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(userActions.loginFailed),
			concatMap(async action => {
				return SnackbarActions.createSnackbar({
					variant: SnackbarVariant.Error,
					text: action.error,
				});
			})
		);
	});

	registerEffect$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(userActions.registerUser),
			switchMap(async action => {
				try {
					const { email, password } = action;
					const request = await this.authService.registerUser(email, password);
					const user = request.user!;
					const userToStore: User = { uid: user.uid, email: user.email! };
					return userActions.loginSuccess({ user: userToStore });
				} catch (err: any) {
					const errorCode = err.code;
					if (errorCode === 'auth/email-already-in-use')
						return userActions.registerFailed({
							error: this.translate.instant('App.Snackbar.Error.EmailAreUsed'),
						});
					return userActions.registerFailed({ error: err.message });
				}
			})
		);
	});

	registerFailed$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(userActions.registerFailed),
			concatMap(async action => {
				return SnackbarActions.createSnackbar({
					variant: SnackbarVariant.Error,
					text: action.error,
				});
			})
		);
	});

	logOutEffect$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(userActions.logOut),
			switchMap(async action => {
				try {
					this.authService.logOut();
					return userActions.logOutSuccess();
				} catch (err) {
					return userActions.logOutFailed();
				}
			})
		);
	});

	loginOnAppInit$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(userActions.loginOnAppInit),
			switchMap(async () => {
				const user = await firstValueFrom(this.authService.getUserStatus());
				if (!user) return userActions.loginOnAppInitFailed();
				const uid = user.uid;
				const email = user.email!;
				return userActions.loginOnAppInitSuccess({ user: { uid, email } });
			})
		);
	});
}
