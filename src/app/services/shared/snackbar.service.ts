import { Injectable } from '@angular/core';
import { Snackbar, SnackbarType } from '@models/snackbar.model';
import { Store } from '@ngrx/store';
import SnackbarActions from '@store/shared/snackbar.actions';
import { AppState } from '@store/store';

@Injectable({
	providedIn: 'root',
})
export class SnackbarService {
	private nextSnackbarId: number = 1;

	constructor(private store: Store<AppState>) {}

	public addSnackbar(type: SnackbarType, text: string): void {
		const id = this.nextSnackbarId;
		const snackbar: Snackbar = {
			id,
			type,
			text: text,
		};
		this.store.dispatch(SnackbarActions.createSnackbar({ snackbar }));
		setTimeout(() => {
			this.removeSnackbar(id);
		}, 6000);
		this.nextSnackbarId += 1;
	}

	public removeSnackbar(id: number): void {
		this.store.dispatch(SnackbarActions.removeSnackbar({ id }));
	}
}