import { AppLanguage } from '@models/app-language.model';
import { createReducer, on } from '@ngrx/store';
import Constants from 'src/app/constants';
import appActions from './app.actions';

export interface MainState {
	currentLanguage: AppLanguage;
	availedLanguage: AppLanguage[];
}
const initialState: MainState = {
	currentLanguage: Constants.languages.english,
	availedLanguage: Object.values(Constants.languages),
};

export const mainReducer = createReducer(
	initialState,
	on(appActions.changeLanguage, (state: MainState, { language }): MainState => {
		return { ...state, currentLanguage: language };
	})
);
