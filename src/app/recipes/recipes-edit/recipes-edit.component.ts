import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import DataState from '@models/data-store.enum';
import Recipe, { NewRecipe } from '@models/recipe.model';
import { Store } from '@ngrx/store';
import { RecipesService } from '@services/recipes/recipes.service';
import RecipesSelectors from '@store/recipes/recipes.selector';
import { AppState } from '@store/store';
import { Observable, Subscription, tap } from 'rxjs';

@Component({
	selector: 'app-recipes-edit',
	templateUrl: './recipes-edit.component.html',
	styleUrls: ['./recipes-edit.component.scss'],
})
export class RecipesEditComponent implements OnInit, OnDestroy {
	public recipe$: Observable<Recipe | undefined> | undefined;
	private recipeState$: Observable<DataState> | undefined;
	private isLoadedSubscription?: Subscription;

	constructor(
		private route: ActivatedRoute,
		private store: Store<AppState>,
		private router: Router,
		private recipeService: RecipesService
	) {}

	ngOnInit(): void {
		this.route.paramMap.subscribe((params: ParamMap) => {
			const id = params.get('id')!;
			this.recipeState$ = this.store.select(RecipesSelectors.selectDataState);
			this.isLoadedSubscription = this.recipeState$.subscribe(state => {
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

	ngOnDestroy(): void {
		if (!this.isLoadedSubscription) return;
		this.isLoadedSubscription.unsubscribe();
	}

	public update(recipe: NewRecipe): void {
		if (!recipe.id) return;
		this.recipeService.update(recipe as Recipe);
	}
}
