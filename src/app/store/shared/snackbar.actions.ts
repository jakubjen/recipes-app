import { Snackbar } from '@models/snackbar.model';
import { createAction, props } from '@ngrx/store';

const createSnackbar = createAction(
	'[App] Create Notification',
	props<{ snackbar: Snackbar }>()
);

const removeSnackbar = createAction(
	'[App] Remove Notification',
	props<{ id: number }>()
);
const SnackbarActions = { createSnackbar, removeSnackbar };

export default SnackbarActions;
