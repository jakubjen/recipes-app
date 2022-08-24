import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipesEditComponent } from './recipes-edit/recipes-edit.component';
import { RecipesAddComponent } from './recipes-add/recipes-add.component';
import { RecipesCardsComponent } from './recipes-cards/recipes-cards.component';
import { TranslateModule } from '@ngx-translate/core';
import { RecipeRouterModule } from './recipe-routing.module';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { recipesReducer } from '@store/recipes/recipes.reducer';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipesService } from '@services/recipes/recipes.service';
import { RecipeResolver } from './resolvers/recipe.resolver';
import { loadRecipesStartEffect } from '@store/recipes/effect/load-recipe-start.effect';

@NgModule({
	declarations: [
		RecipesEditComponent,
		RecipesAddComponent,
		RecipesCardsComponent,
		RecipeDetailComponent,
	],
	providers: [RecipesService, RecipeResolver],
	imports: [
		CommonModule,
		TranslateModule,
		RecipeRouterModule,
		StoreModule.forFeature('recipes', recipesReducer),
		EffectsModule.forFeature([loadRecipesStartEffect]),
	],
	exports: [RecipesAddComponent, RecipesEditComponent, RecipesCardsComponent],
})
export class RecipeModule {}
