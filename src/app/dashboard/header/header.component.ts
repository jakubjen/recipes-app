import {
	animate,
	state,
	style,
	transition,
	trigger,
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { AppLanguage } from '@models/app-language.model';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import appActions from '@store/app/app.actions';
import { appSelectors } from '@store/app/app.selectors';
import { userSelectors } from '@store/auth/selectors';
import userActions from '@store/auth/user.actions';
import { AppState } from '@store/store';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss'],
	animations: [
		trigger('openClose', [
			state('open', style({ opacity: 1 })),
			state(
				'closed',
				style({
					height: 0,
					opacity: 0,
				})
			),
			transition('open => closed', [animate('0.3s ease-out')]),
			transition('closed => open', [animate('0.3s ease-out')]),
		]),
	],
})
export class HeaderComponent implements OnInit {
	public userIsLogin$?: Observable<boolean>;
	public currentLanguages$?: Observable<AppLanguage>;
	public availedLanguages$?: Observable<AppLanguage[]>;
	public languageDropDownIsOpen = false;

	constructor(private store: Store<AppState>) {}

	ngOnInit(): void {
		this.userIsLogin$ = this.store.select(userSelectors.selectIsLogin);
		this.currentLanguages$ = this.store.select(
			appSelectors.selectCurrentLanguage
		);
		this.availedLanguages$ = this.store.select(
			appSelectors.selectAvailedLanguage
		);
	}

	public logOut(): void {
		this.store.dispatch(userActions.logOut());
	}
	public changeLanguage(language: AppLanguage): void {
		if (language) this.store.dispatch(appActions.changeLanguage({ language }));
		this.languageDropDownIsOpen = false;
	}

	public toggleOpen(): void {
		this.languageDropDownIsOpen = !this.languageDropDownIsOpen;
	}
}
