import { createFeatureSelector, createSelector } from '@ngrx/store';
import { selectAllSnackBars, SnackbarState } from './snackbar.reducer';

const selectSnackState = createFeatureSelector<SnackbarState>('snackbar');

const selectAll = createSelector(selectSnackState, selectAllSnackBars);

const snackbarSelectors = {
	selectAll,
};
export default snackbarSelectors;
