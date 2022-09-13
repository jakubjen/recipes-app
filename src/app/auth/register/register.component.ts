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

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
	registerForm = new FormGroup({
		email: new FormControl<string>('', [Validators.required, Validators.email]),
		password: new FormControl<string>('', [
			Validators.required,
			Validators.minLength(8),
			Validators.maxLength(200),
		]),
	});

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
}
