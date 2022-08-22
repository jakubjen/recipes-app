import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import RecipesSelectors from 'src/app/store/recipes/recipes.selector';
import { AppState } from 'src/app/store/store';
import Recipe from '@models/Recipe.model';

@Component({
	selector: 'app-recipe-cards',
	templateUrl: 'recipes-cards.component.html',
	styleUrls: ['recipes-cards.component.scss'],
})
export class RecipesCardsComponent {
	public recipes$: Observable<Recipe[]> = this.store.select(
		RecipesSelectors.selectRecipes
	);
	constructor(private store: Store<AppState>) {}
}
