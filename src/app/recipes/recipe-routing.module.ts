import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoadShoppingListResolver } from '../shared/resolvers/shopping-list/load-shopping-list.resolver';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipesAddComponent } from './recipes-add/recipes-add.component';
import { RecipesCardsComponent } from './recipes-cards/recipes-cards.component';
import { RecipesEditComponent } from './recipes-edit/recipes-edit.component';
import {
	AngularFireAuthGuard,
	redirectUnauthorizedTo,
} from '@angular/fire/compat/auth-guard';
import { PendingChangesGuard } from 'src/helpers/pending-changes.guard';
const redirectUnauthorizedToLogin = () =>
	redirectUnauthorizedTo(['/auth/login']);

const routes: Routes = [
	{
		path: '',
		component: RecipesCardsComponent,
	},
	{
		path: 'recipe/add',
		component: RecipesAddComponent,
		canActivate: [AngularFireAuthGuard],
		canDeactivate: [PendingChangesGuard],

		data: { authGuardPipe: redirectUnauthorizedToLogin },
	},
	{
		path: 'recipe/edit/:id',
		component: RecipesEditComponent,
		canActivate: [AngularFireAuthGuard],
		canDeactivate: [PendingChangesGuard],
		data: { authGuardPipe: redirectUnauthorizedToLogin },
	},
	{
		path: 'recipe/:id',
		component: RecipeDetailComponent,
	},
	{
		path: 'recipe/add',
		component: RecipesAddComponent,
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class RecipeRouterModule {}
