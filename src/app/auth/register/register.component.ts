import { Component, OnInit } from '@angular/core';
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
import { passwordConfirmValidator } from 'src/helpers/password-confirm.validator';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
	public registerForm = new FormGroup(
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
			passwordConfirm: new FormControl<string>(''),
		},
		{ validators: passwordConfirmValidator }
	);

	constructor(private authService: AuthService, private store: Store) {}

	public register(): void {
		if (!this.registerForm.valid) return;
		const { email, password } = this.registerForm.value;
		this.store.dispatch(
			userActions.registerUser({ email: email!, password: password! })
		);
	}

	get email(): AbstractControl<string | null, string | null> | null {
		return this.registerForm.get('email');
	}
	get password(): AbstractControl<string | null, string | null> | null {
		return this.registerForm.get('password');
	}

	get passwordConfirm(): AbstractControl<string | null, string | null> | null {
		return this.registerForm.get('passwordConfirm');
	}
}
