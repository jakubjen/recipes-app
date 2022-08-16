import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { RecipesService } from './services/recipes-service';
import { updateRecipes } from './store/recipes/recipes.actions';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
	constructor(private recipesService: RecipesService, private store: Store) {}
	ngOnInit(): void {
		this.recipesService.fetchRecipes().subscribe({
			next: value => {
				this.store.dispatch(updateRecipes({ recipes: value }));
			},
		});
	}
}
