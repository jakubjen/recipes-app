import { User } from '@models/user.model';
import { createAction, props } from '@ngrx/store';

const loginSuccess = createAction(
	'[Auth Service]  Login successfully',
	props<{ user: User }>()
);

const loginOnInit = createAction(
	'[Auth Service]  Login OnInit',
	props<{ user: User }>()
);

const loginFailed = createAction('[Auth Service] Login failed');

const logOut = createAction('[Auth Service] Log Out');

const userActions = { loginSuccess, loginFailed, logOut, loginOnInit };

export default userActions;
