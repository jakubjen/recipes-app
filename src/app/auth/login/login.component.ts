import { Component } from '@angular/core';
import {
	AbstractControl,
	FormControl,
	FormGroup,
	Validators,
} from '@angular/forms';
import { AuthService } from '@services/auth/auth.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
	loginForm = new FormGroup({
		email: new FormControl<string>('', [Validators.required, Validators.email]),
		password: new FormControl<string>('', [
			Validators.required,
			Validators.minLength(8),
			Validators.maxLength(200),
		]),
	});

	constructor(private authService: AuthService) {}

	public loginWithPassword(): void {
		if (!this.loginForm.valid) return;
		const { email, password } = this.loginForm.value;
		this.authService.loginWithPassword(email!, password!);
	}

	public loginWithGoogle(): void {
		this.authService.loginWithGoogle();
	}

	get email(): AbstractControl<string | null, string | null> | null {
		return this.loginForm.get('email');
	}

	get password(): AbstractControl<string | null, string | null> | null {
		return this.loginForm.get('password');
	}
}
