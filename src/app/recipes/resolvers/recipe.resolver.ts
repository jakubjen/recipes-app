import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Store } from '@ngrx/store';
import { RecipesService } from '@services/recipes/recipes.service';
import RecipesActions from '@store/recipes/recipes.actions';
import RecipesSelectors from '@store/recipes/recipes.selector';
import { AppState } from '@store/store';
import { finalize, first, Observable, tap } from 'rxjs';
import DataState from '@models/data-store.enum';

@Injectable()
export class RecipeResolver implements Resolve<void> {
	private loading = false;

	constructor(private store: Store<AppState>) {}

	resolve(): Observable<any> {
		return this.store.select(RecipesSelectors.selectDataState).pipe(
			tap(state => {
				if (!this.loading && state === DataState.BeforeLoad) {
					this.loading = true;
					this.store.dispatch(RecipesActions.loadRecipesStart());
				}
			}),
			first(),
			finalize(() => (this.loading = false))
		);
	}
}
