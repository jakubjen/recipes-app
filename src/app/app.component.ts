/* eslint-disable @ngrx/prefer-selector-in-select */
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { RecipesService } from './services/recipes-service';
import { setRecipes } from './store/recipes/recipes.actions';
import { AppState } from './store/store';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
	constructor(
		private recipesService: RecipesService,
		private store: Store<AppState>
	) {}
	ngOnInit(): void {
		this.recipesService.fetchRecipes().subscribe({
			next: value => {
				this.store.dispatch(setRecipes({ recipes: value }));
			},
		});
	}
}
