import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipesAddComponent } from './recipes-add/recipes-add.component';
import { RecipesCardsComponent } from './recipes-cards/recipes-cards.component';
import { LoadRecipeResolver } from './resolvers/load-recipe.resolver';

const routes: Routes = [
	{
		path: '',
		resolve: [LoadRecipeResolver],
		component: RecipesCardsComponent,
	},
	{
		path: 'recipe/add',
		component: RecipesAddComponent,
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
