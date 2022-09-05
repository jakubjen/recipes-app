import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import Recipe from '@models/recipe.model';
import { Store } from '@ngrx/store';
import { AppState } from '@store/store';
import RecipesSelectors from '@store/recipes/recipes.selector';
import DataState from '@models/data-store.enum';
import { RecipesService } from '@services/recipes/recipes.service';
import firebase from 'firebase/compat/app';
import { AuthService } from '@services/auth/auth.service';

@Component({
	selector: 'app-recipe-detail',
	templateUrl: './recipe-detail.component.html',
	styleUrls: ['./recipe-detail.component.scss'],
})
export class RecipeDetailComponent implements OnInit {
	public recipe$: Observable<Recipe | undefined> | undefined;
	public recipeState$: Observable<DataState> | undefined;
	public user: firebase.User | null = null;
	constructor(
		private route: ActivatedRoute,
		private store: Store<AppState>,
		private router: Router,
		private recipeService: RecipesService,
		private authService: AuthService
	) {}

	ngOnInit(): void {
		this.route.paramMap.subscribe((params: ParamMap) => {
			const id = params.get('id')!;
			this.recipeState$ = this.store.select(RecipesSelectors.selectDataState);
			this.recipeState$.subscribe(async state => {
				if (state === DataState.Loaded) {
					this.recipe$ = this.store
						.select(RecipesSelectors.selectById(id))
						.pipe(
							tap(recipe => {
								if (!recipe) this.router.navigate([404]);
							})
						);
					this.user = await this.authService.getUser();
				}
			});
		});
	}

	public deleteRecipe(id: string): void {
		this.recipeService.removeRecipe(id);
	}
}
