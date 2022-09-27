import { createSelector } from '@ngrx/store';
import { AppState } from '@store/store';
import { MainState } from './app.reducer';

const selectFeature = (state: AppState) => state.main;

const selectCurrentLanguage = createSelector(
	selectFeature,
	(state: MainState) => state.currentLanguage
);

const selectAvailedLanguage = createSelector(
	selectFeature,
	(state: MainState) => state.availedLanguage
);

export const appSelectors = { selectCurrentLanguage, selectAvailedLanguage };
