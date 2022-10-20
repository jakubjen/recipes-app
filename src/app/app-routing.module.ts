import { NgModule } from '@angular/core';
import {
	AngularFireAuthGuard,
	redirectUnauthorizedTo,
} from '@angular/fire/compat/auth-guard';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundPageComponent } from './shared/not-found-page/not-found-page.component';
import { ShoppingListComponent } from './shopping-list/shopping-list/shopping-list.component';
const redirectUnauthorizedToLogin = () =>
	redirectUnauthorizedTo(['/auth/login']);

const routes: Routes = [
	{
		path: '',
		loadChildren: () =>
			import('./recipes/recipe.module').then(m => m.RecipeModule),
	},
	{
		path: 'shopping-list',
		component: ShoppingListComponent,
		canActivate: [AngularFireAuthGuard],

		data: {
			authGuardPipe: redirectUnauthorizedToLogin,
			title: 'Shopping List',
		},
	},
	{
		path: 'auth',
		loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
	},
	{ path: '**', component: NotFoundPageComponent },
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' }),
	],
	exports: [RouterModule],
})
export class AppRoutingModule {}
