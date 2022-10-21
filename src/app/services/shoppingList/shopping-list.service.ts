import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { IngredientsInStore } from '@models/ingredients.model';

@Injectable({
	providedIn: 'root',
})
export class ShoppingListService {
	constructor(private firestore: AngularFirestore) {}
	public saveList(items: IngredientsInStore[], userId: string): void {
		this.firestore
			.doc<{ value: IngredientsInStore[] }>(`/shoppingLists/${userId}/`)
			.set({ value: items }); //
	}

	public get(userId: string) {
		return this.firestore
			.doc<{ value: IngredientsInStore[] }>(`/shoppingLists/${userId}/`)
			.get();
	}
}
