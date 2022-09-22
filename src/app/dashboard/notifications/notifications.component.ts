import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Snackbar } from '@models/snackbar.model';
import snackbarSelectors from '@store/shared/snackbar.selectors';
import SnackbarActions from '@store/shared/snackbar.actions';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
	selector: 'app-notifications',
	templateUrl: './notifications.component.html',
	styleUrls: ['./notifications.component.scss'],
	animations: [
		trigger('fadeIn', [
			transition('void => *', [
				style({
					height: 0,
					scale: 0,
				}),
				animate('.3s ease-out'),
			]),
			transition('* => void', [
				style({
					scale: 1,
				}),
				animate(
					'.3s ease-out',
					style({
						scale: 0,
						height: 0,
					})
				),
			]),
		]),
	],
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
