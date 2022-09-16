import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { SharedModule } from './shared/shared.module';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { DashboardModule } from './dashboard/dashboard.module';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AngularFireModule } from '@angular/fire/compat';
import {
	AngularFireAnalyticsModule,
	ScreenTrackingService,
	UserTrackingService,
} from '@angular/fire/compat/analytics';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShoppingListComponent } from './shopping-list/shopping-list/shopping-list.component';
import { ShoppingListReducer } from '@store/shopping-list/shopping-list.reducer';
import { shoppingListEffects } from '@store/shopping-list/shopping-list.effects';
import { snackbarReducer } from '@store/shared/snackbar.reducer';
import { userReducer } from '@store/auth/auth.reducer';
import { AuthService } from '@services/auth/auth.service';
import { UserEffects } from '@store/auth/user.effects';
import { SnackbarEffects } from '@store/shared/snackbar.effects';
import { AppEffects } from '@store/app.effect';

export function HttpLoaderFactory(http: HttpClient) {
	return new TranslateHttpLoader(http);
}

@NgModule({
	declarations: [AppComponent, ShoppingListComponent],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		AppRoutingModule,
		HttpClientModule,
		DashboardModule,
		SharedModule,
		TranslateModule.forRoot({
			defaultLanguage: 'en',
			loader: {
				provide: TranslateLoader,
				useFactory: HttpLoaderFactory,
				deps: [HttpClient],
			},
		}),
		BrowserAnimationsModule,
		NgbModule,
		// StoreRouterConnectingModule.forRoot(),
		StoreModule.forRoot({
			shoppingList: ShoppingListReducer,
			snackbar: snackbarReducer,
			user: userReducer,
		}),
		EffectsModule.forRoot([
			UserEffects,
			SnackbarEffects,
			AppEffects,
			shoppingListEffects,
		]),
		StoreDevtoolsModule.instrument({
			maxAge: 25,
			logOnly: environment.production,
		}),
		AngularFireModule.initializeApp(environment.firebase),
		AngularFireAnalyticsModule,
		AngularFirestoreModule,
		AngularFireAnalyticsModule,
		AngularFireAuthModule,
		FormsModule,
		ReactiveFormsModule,
	],
	providers: [ScreenTrackingService, UserTrackingService, AuthService],
	exports: [TranslateModule],
	bootstrap: [AppComponent],
})
export class AppModule {}
