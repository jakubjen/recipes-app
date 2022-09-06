import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import RecipesSelectors from 'src/app/store/recipes/recipes.selector';
import { AppState } from 'src/app/store/store';
import Recipe from '@models/recipe.model';
import DataState from '@models/data-store.enum';

@Component({
	selector: 'app-recipe-cards',
	templateUrl: 'recipes-cards.component.html',
	styleUrls: ['recipes-cards.component.scss'],
})
export class RecipesCardsComponent implements OnInit {
	public recipes$: Observable<Recipe[]> | undefined;
	public recipesAreLoaded$: Observable<DataState> | undefined;
	public dataState: typeof DataState = DataState;
	public searchText = '';
	public sortCategory: keyof Recipe = 'title';
	public sortingCategories: (keyof Recipe)[] = ['title', 'time'];
	public sortDirection: 'asc' | 'desc' = 'asc';

	constructor(private store: Store<AppState>) {}

	ngOnInit(): void {
		this.recipes$ = this.store.select(RecipesSelectors.selectAll);
		this.recipesAreLoaded$ = this.store.select(
			RecipesSelectors.selectDataState
		);
	}

	public handleTextSearchInput(value: Event): void {
		this.searchText = (<HTMLInputElement>value.target).value;
	}

	public selectFileToSort(event: Event): void {
		this.sortCategory = (<HTMLInputElement>event.target).value as keyof Recipe;
	}

	public changeSortDirection(): void {
		if (this.sortDirection === 'asc') {
			this.sortDirection = 'desc';
			return;
		}
		if (this.sortDirection === 'desc') this.sortDirection = 'asc';
	}
}
