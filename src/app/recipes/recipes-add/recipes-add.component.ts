import { Component } from '@angular/core';
import Recipe from '@models/recipe.model';
import { Store } from '@ngrx/store';
import RecipesActions from '@store/recipes/recipes.actions';
import { AppState } from '@store/store';

@Component({
	selector: 'app-recipes-add',
	templateUrl: './recipes-add.component.html',
	styleUrls: ['./recipes-add.component.scss'],
})
export class RecipesAddComponent {
	constructor(private store: Store<AppState>) {}

	addRecipe(recipe: Recipe) {
		this.store.dispatch(RecipesActions.addRecipe({ recipe }));
	}
}
