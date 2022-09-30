import Constants from 'src/app/constants';
import appActions from './app.actions';
import { mainReducer, MainState, MainStateInitialValues } from './app.reducer';

describe('AuthReducer', () => {
	const initialState: MainState = MainStateInitialValues;

	it('should have english and polish language on startup', () => {
		expect(initialState.availedLanguage).toEqual([
			{ name: 'English', shortName: 'en', nativeName: 'English' },
			{ name: 'Polish', shortName: 'pl', nativeName: 'Polski' },
		]);
	});
	it('should put user to store and set isLogIn on true on  loginSuccess', () => {
		const action = appActions.changeLanguage({
			language: Constants.languages.polish,
		});

		const result = mainReducer(initialState, action);
		expect(result).not.toBe(initialState);
		expect(result.availedLanguage).toEqual([
			{ name: 'English', shortName: 'en', nativeName: 'English' },
			{ name: 'Polish', shortName: 'pl', nativeName: 'Polski' },
		]);
		expect(result.currentLanguage).toEqual({
			name: 'Polish',
			shortName: 'pl',
			nativeName: 'Polski',
		});
	});
});
