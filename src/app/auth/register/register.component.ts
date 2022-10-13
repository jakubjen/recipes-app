import { Component, OnInit } from '@angular/core';
import {
	AbstractControl,
	FormControl,
	FormGroup,
	Validators,
} from '@angular/forms';
import { ProgresBarColor } from '@models/progres-bar-color';
import { Store } from '@ngrx/store';
import { AuthService } from '@services/auth/auth.service';
import userActions from '@store/auth/user.actions';
import { customEmailValidator } from 'src/helpers/email.validator';
import { passwordConfirmValidator } from 'src/helpers/password-confirm.validator';
import { passwordStrength } from 'check-password-strength';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
	public passwordStrength: number = 0;
	public progresBarColor: ProgresBarColor = ProgresBarColor.Red;

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
			passwordConfirm: new FormControl<string>('', Validators.required),
		},
		{ validators: passwordConfirmValidator }
	);

	constructor(private store: Store) {}

	public register(): void {
		if (!this.registerForm.valid) return;
		const { email, password } = this.registerForm.value;
		this.store.dispatch(
			userActions.registerUser({ email: email!, password: password! })
		);
	}

	public testPasswordStrength(password: string): void {
		const userPasswordStrength = passwordStrength(password);

		if (!userPasswordStrength.length) {
			this.progresBarColor = ProgresBarColor.Red;
			this.passwordStrength = 0;
			return;
		}

		if (userPasswordStrength.value === 'Strong') {
			this.progresBarColor = ProgresBarColor.Green;
			this.passwordStrength = 100;
			return;
		}

		if (userPasswordStrength.value === 'Medium') {
			this.progresBarColor = ProgresBarColor.Yellow;
			this.passwordStrength = 60;
			return;
		}
		this.progresBarColor = ProgresBarColor.Red;
		this.passwordStrength = 30;
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
