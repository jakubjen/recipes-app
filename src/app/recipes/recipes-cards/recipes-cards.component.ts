import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import RecipesSelectors from 'src/app/store/recipes/recipes.selector';
import { AppState } from 'src/app/store/store';
import Recipe from '@models/recipe.model';
import dataState from 'src/app/enums/data-store.enum';

@Component({
	selector: 'app-recipe-cards',
	templateUrl: 'recipes-cards.component.html',
	styleUrls: ['recipes-cards.component.scss'],
})
export class RecipesCardsComponent implements OnInit {
	public recipes$: Observable<Recipe[]> | undefined;
	public recipesAreLoaded$: Observable<dataState> | undefined;
	constructor(private store: Store<AppState>) {}

	ngOnInit(): void {
		this.recipes$ = this.store.select(RecipesSelectors.selectAll);
		this.recipesAreLoaded$ = this.store.select(
			RecipesSelectors.selectDataState
		);
	}
}
