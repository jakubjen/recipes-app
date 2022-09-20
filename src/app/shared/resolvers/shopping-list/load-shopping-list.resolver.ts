import { Injectable } from '@angular/core';
import {
	Router,
	Resolve,
	RouterStateSnapshot,
	ActivatedRouteSnapshot,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { shoppingListActions } from '@store/shopping-list/shopping-list.actions';
import { Observable, of } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class LoadShoppingListResolver implements Resolve<boolean> {
	constructor(private store: Store) {}

	resolve(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): Observable<boolean> {
		this.store.dispatch(shoppingListActions.loadIngredients());
		return of(true);
	}
}
