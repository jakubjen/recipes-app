import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Snackbar } from '@models/snackbar.model';
import snackbarSelectors from '@store/shared/snackbar.selectors';
import SnackbarActions from '@store/shared/snackbar.actions';

@Component({
	selector: 'app-notifications',
	templateUrl: './notifications.component.html',
	styleUrls: ['./notifications.component.scss'],
})
export class NotificationsComponent implements OnInit {
	public snackbars$?: Observable<Snackbar[]>;

	constructor(private store: Store) {}

	ngOnInit(): void {
		this.snackbars$ = this.store.select(snackbarSelectors.selectAll);
	}

	removeSnackbar(id: string): void {
		this.store.dispatch(SnackbarActions.removeSnackbar({ id }));
	}
}
