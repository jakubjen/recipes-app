import { NgModule } from '@angular/core';
import {
	AngularFireAuthGuard,
	redirectLoggedInTo,
} from '@angular/fire/compat/auth-guard';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const redirectLoggedInToHome = () => redirectLoggedInTo(['/']);

const routes: Routes = [
	{
		path: 'login',
		component: LoginComponent,
		canActivate: [AngularFireAuthGuard],
		data: {
			authGuardPipe: redirectLoggedInToHome,
			title: 'Login',
		},
	},
	{
		path: 'register',
		canActivate: [AngularFireAuthGuard],
		component: RegisterComponent,
		data: {
			authGuardPipe: redirectLoggedInToHome,
			title: 'Register',
		},
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class AuthRouterModule {}
