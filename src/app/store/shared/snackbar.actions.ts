import { Snackbar, SnackbarVariant } from '@models/snackbar.model';
import { createAction, props } from '@ngrx/store';

const createSnackbar = createAction(
	'[App] Create Notification',
	props<{ variant: SnackbarVariant; text: string }>()
);

const addSnackbar = createAction(
	'[App] Add Notification',
	props<{ snackbar: Snackbar }>()
);

const removeSnackbar = createAction(
	'[App] Remove Notification',
	props<{ id: string }>()
);
const SnackbarActions = { createSnackbar, removeSnackbar, addSnackbar };

export default SnackbarActions;
