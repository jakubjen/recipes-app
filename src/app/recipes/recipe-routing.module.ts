import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoadShoppingListResolver } from '../shared/resolvers/shopping-list/load-shopping-list.resolver';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipesAddComponent } from './recipes-add/recipes-add.component';
import { RecipesCardsComponent } from './recipes-cards/recipes-cards.component';

const routes: Routes = [
	{
		path: '',
		component: RecipesCardsComponent,
	},
	{
		path: 'recipe/add',
		component: RecipesAddComponent,
	},
	{
		path: 'recipe/:id',
		component: RecipeDetailComponent,
		resolve: [LoadShoppingListResolver],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class RecipeRouterModule {}
