import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { HomePageComponent } from './home-page/home-page.component';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipesEditComponent } from './recipes/recipes-edit/recipes-edit.component';
import { RecipesAddComponent } from './recipes/recipes-add/recipes-add.component';

export function HttpLoaderFactory(http: HttpClient) {
	return new TranslateHttpLoader(http);
}

@NgModule({
	declarations: [
		AppComponent,
		HomePageComponent,
		RecipesComponent,
		RecipesComponent,
		RecipesEditComponent,
		RecipesAddComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		HttpClientModule,
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
		StoreModule.forRoot({}, {}),
		StoreDevtoolsModule.instrument({
			maxAge: 25,
			logOnly: environment.production,
		}),
	],
	providers: [],
	exports: [TranslateModule],
	bootstrap: [AppComponent],
})
export class AppModule {}
