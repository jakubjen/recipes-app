import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { Snackbar } from '@models/snackbar.model';
import SnackbarActions from './snackbar.actions';
import { state } from '@angular/animations';

export interface SnackbarState extends EntityState<Snackbar> {}
const adapter: EntityAdapter<Snackbar> = createEntityAdapter<Snackbar>();
const initialState = adapter.getInitialState();
export const snackbarReducer = createReducer(
	initialState,

	on(
		SnackbarActions.addSnackbar,
		(state: SnackbarState, { snackbar }): SnackbarState => {
			if (state.ids.length >= 8) {
				state = adapter.removeOne(<string>state.ids[0], state);
			}
			return adapter.addOne(snackbar, state);
		}
	),
	on(
		SnackbarActions.removeSnackbar,
		(state: SnackbarState, { id }): SnackbarState => {
			return adapter.removeOne(id, state);
		}
	)
);

const { selectIds, selectEntities, selectAll, selectTotal } =
	adapter.getSelectors();

export const selectSnackBarIds = selectIds;
export const selectSnackBarEntities = selectEntities;
export const selectAllSnackBars = selectAll;
export const selectSnackbarTotal = selectTotal;
