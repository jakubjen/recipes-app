import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import RecipesSelectors from 'src/app/store/recipes/recipes.selector';
import { AppState } from 'src/app/store/store';
import Recipe from '@models/recipe.model';
import DataState from '@models/data-store.enum';
import SortDirection from '@models/sort-direction';

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
	public sortCategory: keyof Omit<Recipe, 'urlSlug'> = 'title';
	public sortingCategories: (keyof Recipe)[] = ['title', 'time'];
	public sortDirection: SortDirection = SortDirection.ASC;
	public sortDirectionEnum = SortDirection;
	public filterCategories = ['title', 'description'];

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
		this.sortCategory = (<HTMLInputElement>event.target).value as keyof Omit<
			Recipe,
			'urlSlug'
		>;
	}

	public getRecipeUrl(recipe: Recipe): string {
		return `recipe/${!!recipe.urlSlug ? recipe.urlSlug : recipe.id}`;
	}

	public changeSortDirection(): void {
		this.sortDirection =
			this.sortDirection === SortDirection.ASC
				? SortDirection.DESC
				: SortDirection.ASC;
	}

	public changeFilterCategories(category: string) {
		this.filterCategories = this.filterCategories.includes(category)
			? this.filterCategories.filter(e => e != category)
			: [...this.filterCategories, category];
		if (!this.filterCategories.length) this.filterCategories = [category];
	}
}
