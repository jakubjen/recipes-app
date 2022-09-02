import { Component, OnInit } from '@angular/core';
import {
	AbstractControl,
	FormControl,
	FormGroup,
	Validators,
} from '@angular/forms';
import { AuthService } from '@services/auth/auth.service';

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

	constructor(private authService: AuthService) {}

	public register(): void {
		if (!this.registerForm.valid) return;
		const { email, password } = this.registerForm.value;
		this.authService.registerUser(email!, password!);
	}

	get email(): AbstractControl<string | null, string | null> | null {
		return this.registerForm.get('email');
	}
	get password(): AbstractControl<string | null, string | null> | null {
		return this.registerForm.get('password');
	}
}
