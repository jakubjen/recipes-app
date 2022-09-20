import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { delay, map, mergeMap } from 'rxjs';
import SnackbarActions from './snackbar.actions';
import { v4 as uuidv4 } from 'uuid';
import { Snackbar } from '@models/snackbar.model';

@Injectable()
export class SnackbarEffects {
	createSnackbar$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(SnackbarActions.createSnackbar),
			map(action => {
				const snackbar: Snackbar = {
					id: uuidv4(),
					variant: action.variant,
					text: action.text,
				};
				return SnackbarActions.addSnackbar({ snackbar });
			})
		);
	});
	autoRemoveSnackbar$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(SnackbarActions.addSnackbar),
			delay(6000),
			map(action => SnackbarActions.removeSnackbar({ id: action.snackbar.id }))
		);
	});
	constructor(private actions$: Actions) {}
}
