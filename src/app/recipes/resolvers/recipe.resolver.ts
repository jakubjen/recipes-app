import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Store } from '@ngrx/store';
import RecipesActions from '@store/recipes/recipes.actions';
import RecipesSelectors from '@store/recipes/recipes.selector';
import { AppState } from '@store/store';
import { finalize, first, Observable, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RecipeResolver implements Resolve<void> {
	private loading = false;

	constructor(private store: Store<AppState>) {}

	resolve(): Observable<any> {
		return this.store.select(RecipesSelectors.selectRecipesAreLoaded).pipe(
			tap(recipesLoaded => {
				if (!this.loading && !recipesLoaded) {
					this.loading = true;
					this.store.dispatch(RecipesActions.loadRecipes());
				}
			}),
			first(),
			finalize(() => (this.loading = false))
		);
	}
}
