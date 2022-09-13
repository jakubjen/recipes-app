import { createReducer, on } from '@ngrx/store';
import { User } from '@models/user.model';
import userActions from './user.actions';

export interface UserState {
	user?: User;
	isLogin: boolean;
}
const initialState: UserState = {
	user: undefined,
	isLogin: false,
};

export const userReducer = createReducer(
	initialState,

	on(userActions.loginSuccess, (state: UserState, { user }): UserState => {
		return { user, isLogin: true };
	}),

	on(
		userActions.loginOnAppInitSuccess,
		(state: UserState, { user }): UserState => {
			return { user, isLogin: true };
		}
	),

	on(userActions.loginFailed, (state: UserState): UserState => {
		return { user: undefined, isLogin: false };
	}),

	on(userActions.logOut, (state: UserState): UserState => {
		return { user: undefined, isLogin: false };
	})
);
