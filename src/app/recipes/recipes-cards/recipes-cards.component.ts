import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectRecipes } from 'src/app/store/recipes/recipes.selector';
import { AppState } from 'src/app/store/store';
import Recipe from 'src/models/Recipe.model';

@Component({
	selector: 'app-recipe-cards',
	templateUrl: 'recipes-cards.component.html',
	styleUrls: ['recipes-cards.component.scss'],
})
export class RecipesCardsComponent {
	recipes$: Observable<Recipe[]> = this.store.select(selectRecipes);
	constructor(private store: Store<AppState>) {}
}
