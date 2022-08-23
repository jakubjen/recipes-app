import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipesEditComponent } from './recipes-edit/recipes-edit.component';
import { RecipesAddComponent } from './recipes-add/recipes-add.component';
import { RecipesCardsComponent } from './recipes-cards/recipes-cards.component';
import { TranslateModule } from '@ngx-translate/core';
import { RecipeRouterModule } from './recipe-routing.module';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { loadRecipeEffect } from '@store/recipes/effects/load-recipes-effect';
import { recipesReducer } from '@store/recipes/recipes.reducer';
import { loadRecipesSuccessEffect } from '@store/recipes/effects/load-success-recipe.effect';

@NgModule({
	declarations: [
		RecipesEditComponent,
		RecipesAddComponent,
		RecipesCardsComponent,
	],
	imports: [
		CommonModule,
		TranslateModule,
		RecipeRouterModule,
		StoreModule.forFeature('recipes', recipesReducer),
		EffectsModule.forFeature([loadRecipeEffect, loadRecipesSuccessEffect]),
	],
	exports: [RecipesAddComponent, RecipesEditComponent, RecipesCardsComponent],
})
export class RecipeModule {}
