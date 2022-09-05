import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipesAddComponent } from './recipes-add/recipes-add.component';
import { RecipesCardsComponent } from './recipes-cards/recipes-cards.component';
import { RecipesEditComponent } from './recipes-edit/recipes-edit.component';
import { LoadRecipeResolver } from './resolvers/load-recipe.resolver';
import {
	AngularFireAuthGuard,
	redirectUnauthorizedTo,
} from '@angular/fire/compat/auth-guard';
const redirectUnauthorizedToLogin = () =>
	redirectUnauthorizedTo(['/auth/login']);

const routes: Routes = [
	{
		path: '',
		resolve: [LoadRecipeResolver],
		component: RecipesCardsComponent,
	},
	{
		path: 'recipe/add',
		component: RecipesAddComponent,
		canActivate: [AngularFireAuthGuard],
		data: { authGuardPipe: redirectUnauthorizedToLogin },
	},
	{
		path: 'recipe/edit/:id',
		resolve: [LoadRecipeResolver],
		component: RecipesEditComponent,
	},
	{
		path: 'recipe/:id',
		resolve: [LoadRecipeResolver],
		component: RecipeDetailComponent,
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class RecipeRouterModule {}
