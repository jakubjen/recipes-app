import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire/compat';
import {
	AngularFireAnalyticsModule,
	ScreenTrackingService,
	UserTrackingService,
} from '@angular/fire/compat/analytics';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AuthService } from '@services/auth/auth.service';
import { RecipesService } from '@services/recipes/recipes.service';
import { AppEffects } from '@store/app.effect';
import { userReducer } from '@store/auth/auth.reducer';
import { UserEffects } from '@store/auth/user.effects';
import { SnackbarEffects } from '@store/shared/snackbar.effects';
import { ConvertUnitPipe } from './shopping-list/shopping-list/convert-unit.pipe';
import { mainReducer } from '@store/app/app.reducer';
import { snackbarReducer } from '@store/shared/snackbar.reducer';
import { shoppingListEffects } from '@store/shopping-list/shopping-list.effects';
import { ShoppingListReducer } from '@store/shopping-list/shopping-list.reducer';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { SharedModule } from './shared/shared.module';
import { ConvertUnitPipe } from './shopping-list/shopping-list/convert-unit.pipe';
import { ShoppingListComponent } from './shopping-list/shopping-list/shopping-list.component';

export function HttpLoaderFactory(http: HttpClient) {
	return new TranslateHttpLoader(http);
}

@NgModule({
	declarations: [AppComponent, ShoppingListComponent, ConvertUnitPipe],
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
		StoreRouterConnectingModule.forRoot(),
		StoreModule.forRoot({
			shoppingList: ShoppingListReducer,
			snackbar: snackbarReducer,
			user: userReducer,
			main: mainReducer,
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
	providers: [
		ScreenTrackingService,
		UserTrackingService,
		AuthService,
		RecipesService,
	],
	exports: [TranslateModule],
	bootstrap: [AppComponent],
})
export class AppModule {}
