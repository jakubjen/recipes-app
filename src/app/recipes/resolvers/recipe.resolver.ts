import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Store } from '@ngrx/store';
import { RecipesService } from '@services/recipes/recipes.service';
import RecipesActions from '@store/recipes/recipes.actions';
import RecipesSelectors from '@store/recipes/recipes.selector';
import { AppState } from '@store/store';
import { finalize, first, Observable, tap } from 'rxjs';
import dataState from 'src/app/enums/data-store.enum';

@Injectable()
export class RecipeResolver implements Resolve<void> {
	private loading = false;

	constructor(
		private store: Store<AppState>,
		private recipeService: RecipesService
	) {}

	resolve(): Observable<any> {
		return this.store.select(RecipesSelectors.selectDataState).pipe(
			tap(state => {
				if (!this.loading && state === dataState.beforeLoad) {
					this.loading = true;
					this.store.dispatch(RecipesActions.loadRecipesStart());
				}
			}),
			first(),
			finalize(() => (this.loading = false))
		);
	}
}
