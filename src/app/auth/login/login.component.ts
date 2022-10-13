import { Component } from '@angular/core';
import {
	AbstractControl,
	FormControl,
	FormGroup,
	Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { AuthService } from '@services/auth/auth.service';
import userActions from '@store/auth/user.actions';
import { customEmailValidator } from 'src/helpers/email.validator';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
	loginForm = new FormGroup(
		{
			email: new FormControl<string>('', [
				Validators.required,
				customEmailValidator(),
			]),
			password: new FormControl<string>('', [
				Validators.required,
				Validators.minLength(8),
				Validators.maxLength(200),
			]),
		},
		{ updateOn: 'submit' }
	);

	constructor(private authService: AuthService, private store: Store) {}

	public loginWithPassword(): void {
		if (!this.loginForm.valid) return;
		const { email, password } = this.loginForm.value;
		this.store.dispatch(
			userActions.loginWithPassword({ email: email!, password: password! })
		);
	}

	public loginWithGoogle(): void {
		this.store.dispatch(userActions.loginWithGoogle());
	}

	get email(): AbstractControl<string | null, string | null> | null {
		return this.loginForm.get('email');
	}

	get password(): AbstractControl<string | null, string | null> | null {
		return this.loginForm.get('password');
	}
}
