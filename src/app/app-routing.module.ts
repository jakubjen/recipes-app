import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundPageComponent } from './shared/not-found-page/not-found-page.component';
import { LoadShoppingListResolver } from './shared/resolvers/shopping-list/load-shopping-list.resolver';
import { ShoppingListComponent } from './shopping-list/shopping-list/shopping-list.component';

const routes: Routes = [
	{
		path: '',
		loadChildren: () =>
			import('./recipes/recipe.module').then(m => m.RecipeModule),
	},
	{
		path: 'shopping-list',
		component: ShoppingListComponent,
		resolve: [LoadShoppingListResolver],
		data: { title: 'Shopping List' },
	},
	{
		path: 'auth',
		loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
	},
	{ path: '**', component: NotFoundPageComponent },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
