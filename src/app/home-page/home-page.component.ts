import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import Recipe from 'src/models/Recipe.model';
import { selectRecipes } from '../store/recipes/recipes.selector';
import { AppState } from '../store/store';

@Component({
	selector: 'app-home-page',
	templateUrl: './home-page.component.html',
	styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent {
	recipes$: Observable<Recipe[]> = this.store.select(selectRecipes);
	constructor(private store: Store<AppState>) {}
}
