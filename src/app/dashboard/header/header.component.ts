import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthService } from '@services/auth/auth.service';
import { userSelectors } from '@store/auth/selectors';
import userActions from '@store/auth/user.actions';
import { AppState } from '@store/store';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
	public userIsLogin$?: Observable<boolean>;

	constructor(private store: Store<AppState>) {}

	ngOnInit(): void {
		this.userIsLogin$ = this.store.select(userSelectors.selectIsLogin);
	}

	public logOut(): void {
		this.store.dispatch(userActions.logOut());
	}
}
