import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { SnackbarType } from '@models/snackbar.model';
import { Store } from '@ngrx/store';
import { SnackbarService } from '@services/shared/snackbar.service';
import userActions from '@store/auth/user.actions';
import { AppState } from '@store/store';
import { firstValueFrom } from 'rxjs';
import firebase from 'firebase/compat/app';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class AuthService {
	constructor(
		private auth: AngularFireAuth,
		private snackbar: SnackbarService,
		private router: Router,
		private store: Store<AppState>,
		private translate: TranslateService
	) {
		this.loginOnInit();
	}

	public async registerUser(email: string, password: string) {
		try {
			await this.auth.createUserWithEmailAndPassword(email, password);
			this.snackbar.addSnackbar(
				SnackbarType.Success,
				await firstValueFrom(
					this.translate.get('App.Snackbar.UserCreatedSuccess')
				)
			);
			this.router.navigate(['/']);
		} catch (err: any) {
			this.snackbar.addSnackbar(SnackbarType.Error, err.message);
		}
	}

	public async loginWithPassword(email: string, password: string) {
		try {
			const response = await this.auth.signInWithEmailAndPassword(
				email,
				password
			);
			const user = response.user!;
			this.loginSuccess(user);
		} catch (err: any) {
			this.store.dispatch(userActions.loginFailed());
			this.snackbar.addSnackbar(SnackbarType.Error, err.message);
		}
	}

	public async loginSuccess(user: firebase.User): Promise<void> {
		const uid = user.uid;
		const email = user.email!;
		this.store.dispatch(userActions.loginSuccess({ user: { uid, email } }));
		this.snackbar.addSnackbar(
			SnackbarType.Success,
			await firstValueFrom(this.translate.get('App.Snackbar.LoginSuccessfully'))
		);
		this.router.navigate(['/']);
	}

	public async loginWithGoogle() {
		try {
			const response = await this.auth.signInWithPopup(
				new firebase.auth.GoogleAuthProvider()
			);
			const user = response.user!;
			this.loginSuccess(user);
		} catch (err: any) {
			this.store.dispatch(userActions.loginFailed());
			this.snackbar.addSnackbar(SnackbarType.Error, err.message);
		}
	}

	public async logOut(): Promise<void> {
		this.auth.signOut();
		this.store.dispatch(userActions.logOut());
		this.snackbar.addSnackbar(
			SnackbarType.Info,
			await firstValueFrom(
				this.translate.get('App.Snackbar.LogoutSuccessfully')
			)
		);
	}

	private async loginOnInit() {
		const user = await firstValueFrom(this.auth.authState);
		if (!user) return;
		const uid = user.uid;
		const email = user.email!;

		this.store.dispatch(userActions.loginOnInit({ user: { uid, email } }));
	}

	public async getUser() {
		return firstValueFrom(this.auth.authState);
	}
}
