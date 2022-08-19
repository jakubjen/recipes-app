import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Store } from '@ngrx/store';
import RecipesActions from '@store/recipes/recipes.actions';
import { finalize, first, Observable, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RecipeResolver implements Resolve<any> {
	loading = false;

	constructor(private store: Store) {}

	resolve(): Observable<any> {
		return this.store.pipe(
			tap(() => {
				if (!this.loading) {
					this.loading = true;
					this.store.dispatch(RecipesActions.loadRecipes());
				}
			}),
			first(),
			finalize(() => (this.loading = false))
		);
	}
}
