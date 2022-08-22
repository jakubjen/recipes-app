import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipesCardsComponent } from './recipes-cards/recipes-cards.component';
import { RecipeResolver } from './resolvers/recipe.resolver';

const routes: Routes = [
	{
		path: '',
		resolve: [RecipeResolver],
		component: RecipesCardsComponent,
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class RecipeRouterModule {}
