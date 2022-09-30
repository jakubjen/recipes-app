import { userReducer, UserState } from './auth.reducer';
import userActions from './user.actions';
describe('AuthReducer', () => {
	const initialState: UserState = {
		user: undefined,
		isLogin: false,
	};

	it('should put user to store and set isLogIn on true on  loginSuccess', () => {
		const action = userActions.loginSuccess({
			user: { uid: 'gh5ks193scn', email: 'test@test.test' },
		});

		const expectedState = {
			user: { uid: 'gh5ks193scn', email: 'test@test.test' },
			isLogin: true,
		};

		const result = userReducer(initialState, action);
		console.log(result);
		expect(result).not.toBe(initialState);
		expect(result).toEqual(expectedState);
	});

	it('should put user to store and set isLogIn on true on AppInitLogin success', () => {
		const action = userActions.loginOnAppInitSuccess({
			user: { uid: 'gh5ks193scn', email: 'test@test.test' },
		});

		const expectedState = {
			user: { uid: 'gh5ks193scn', email: 'test@test.test' },
			isLogin: true,
		};

		const result = userReducer(initialState, action);
		expect(result).not.toBe(initialState);
		expect(result).toEqual(expectedState);
	});

	it('should delete user from store and set isLogin to false', () => {
		const action = userActions.loginFailed({ error: 'error' });

		const expectedState = {
			user: undefined,
			isLogin: false,
		};

		const result = userReducer(initialState, action);
		expect(result).not.toBe(initialState);
		expect(result).toEqual(expectedState);
	});

	it('should logout', () => {
		const action = userActions.logOut();

		const expectedState = {
			user: undefined,
			isLogin: false,
		};

		const result = userReducer(initialState, action);
		expect(result).not.toBe(initialState);
		expect(result).toEqual(expectedState);
	});
});
