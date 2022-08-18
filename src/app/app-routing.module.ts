import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipesCardsComponent } from './recipes/recipes-cards/recipes-cards.component';
import { RecipesEditComponent } from './recipes/recipes-edit/recipes-edit.component';
import { NotFoundPageComponent } from './shared/not-found-page/not-found-page.component';

const routes: Routes = [
	{ path: '', component: RecipesCardsComponent },
	{
		path: 'recipes',
		children: [
			{ path: 'edit', component: RecipesEditComponent },
			// { path: '', component: RecipesComponent },
		],
	},
	{ path: '**', component: NotFoundPageComponent },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
