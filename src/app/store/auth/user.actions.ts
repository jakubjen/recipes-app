import { User } from '@models/user.model';
import { createAction, props } from '@ngrx/store';

const loginWithPassword = createAction(
	'[Login page]  Login with password',
	props<{ email: string; password: string }>()
);

const loginWithGoogle = createAction('[Login page]  Login with google');

const loginFailed = createAction(
	'[Login Page] Login failed',
	props<{ error: string }>()
);

const loginSuccess = createAction(
	'[Login Effect]  Login successfully',
	props<{ user: User }>()
);

const registerUser = createAction(
	'[Register Page] Register user',
	props<{ email: string; password: string }>()
);

const registerFailed = createAction(
	'[Register Effect] Register failed',
	props<{ error: string }>()
);

const logOutFailed = createAction('[LogOut Effect] Logout failed');

const logOutSuccess = createAction('[LogOut Effect] Logout success');

const loginOnAppInit = createAction('[App Component] Login OnInit');

const loginOnAppInitSuccess = createAction(
	'[App Component] Login OnInit Success',
	props<{ user: User }>()
);

const loginOnAppInitFailed = createAction(
	'[App Component] Login OnInit Failed'
);

const logOut = createAction('[Auth Service] Log Out');

const userActions = {
	loginWithPassword,
	loginSuccess,
	loginFailed,
	logOut,
	loginWithGoogle,
	loginOnAppInit,
	loginOnAppInitSuccess,
	loginOnAppInitFailed,
	logOutFailed,
	logOutSuccess,
	registerFailed,
	registerUser,
};

export default userActions;
