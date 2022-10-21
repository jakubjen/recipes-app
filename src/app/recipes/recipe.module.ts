import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipesEditComponent } from './recipes-edit/recipes-edit.component';
import { RecipesCardsComponent } from './recipes-cards/recipes-cards.component';
import { TranslateModule } from '@ngx-translate/core';
import { RecipeRouterModule } from './recipe-routing.module';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { recipesReducer } from '@store/recipes/recipes.reducer';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeCardComponent } from './recipe-card/recipe-card.component';
import { RecipeFromComponent } from './recipe-from/recipe-from.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RecipesAddComponent } from './recipes-add/recipes-add.component';
import { SharedModule } from '../shared/shared.module';
import { FilterRecipesPipe } from './filter-recipes.pipe';
import { SortRecipesPipe } from './sort-recipes.pipe';
import { RecipeEffects } from '@store/recipes/effect/recipes.effects';
import { NumberValidationDirective } from 'src/helpers/number-validation.directive';
import { NgbProgressbarModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
	declarations: [
		RecipesEditComponent,
		RecipesAddComponent,
		RecipesCardsComponent,
		RecipeDetailComponent,
		RecipeCardComponent,
		RecipeFromComponent,
		FilterRecipesPipe,
		SortRecipesPipe,
	],
	imports: [
		CommonModule,
		TranslateModule,
		RecipeRouterModule,
		StoreModule.forFeature('recipes', recipesReducer),
		EffectsModule.forFeature([RecipeEffects]),
		FormsModule,
		ReactiveFormsModule,
		SharedModule,
		NgbProgressbarModule,
	],
	exports: [RecipesAddComponent, RecipesEditComponent, RecipesCardsComponent],
})
export class RecipeModule {}
