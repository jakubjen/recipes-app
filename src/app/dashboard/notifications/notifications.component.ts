import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Snackbar } from '@models/snackbar.model';
import snackbarSelectors from '@store/shared/snackbar.selectors';
import { SnackbarService } from '@services/shared/snackbar.service';

@Component({
	selector: 'app-notifications',
	templateUrl: './notifications.component.html',
	styleUrls: ['./notifications.component.scss'],
})
export class NotificationsComponent implements OnInit {
	public snackbars$?: Observable<Snackbar[]>;

	constructor(private store: Store, private snackbarService: SnackbarService) {}

	ngOnInit(): void {
		this.snackbars$ = this.store.select(snackbarSelectors.selectAll);
	}

	removeSnackbar(id: number): void {
		this.snackbarService.removeSnackbar(id);
	}
}
