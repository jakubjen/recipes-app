import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { first, map, Observable, Subscription, switchMap, tap } from 'rxjs';
import Recipe from '@models/recipe.model';
import { Store } from '@ngrx/store';
import { AppState } from '@store/store';
import RecipesSelectors from '@store/recipes/recipes.selector';
import DataState from '@models/data-store.enum';

@Component({
	selector: 'app-recipe-detail',
	templateUrl: './recipe-detail.component.html',
	styleUrls: ['./recipe-detail.component.scss'],
})
export class RecipeDetailComponent implements OnInit {
	public recipe$: Observable<Recipe | undefined> | undefined;
	public recipeState$: Observable<DataState> | undefined;

	constructor(
		private route: ActivatedRoute,
		private store: Store<AppState>,
		private router: Router
	) {}

	ngOnInit(): void {
		this.route.paramMap.subscribe((params: ParamMap) => {
			const id = params.get('id')!;
			this.recipeState$ = this.store.select(RecipesSelectors.selectDataState);
			this.recipeState$.subscribe(state => {
				if (state === DataState.Loaded) {
					this.recipe$ = this.store
						.select(RecipesSelectors.selectById(id))
						.pipe(
							tap(recipe => {
								if (!recipe) this.router.navigate([404]);
							})
						);
				}
			});
		});
	}
}
