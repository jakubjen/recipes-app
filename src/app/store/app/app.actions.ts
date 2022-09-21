import { AppLanguage } from '@models/app-language.model';
import { createAction, props } from '@ngrx/store';

const appInit = createAction('[App component] Init app');
const changeLanguage = createAction(
	'[App header] Change language',
	props<{ language: AppLanguage }>()
);

const changeLanguageOnInitFailed = createAction(
	'[App] Change language on init failed'
);

const appActions = { appInit, changeLanguage, changeLanguageOnInitFailed };

export default appActions;
