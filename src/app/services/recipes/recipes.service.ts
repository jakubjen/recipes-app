import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import FirebaseActions from '@models/firebase-actions.enum';
import Recipe from '@models/recipe.model';
import { Store } from '@ngrx/store';
import RecipesActions from '@store/recipes/recipes.actions';
import { AppState } from '@store/store';

@Injectable()
export class RecipesService {
	constructor(
		private store: Store<AppState>,
		private firestore: AngularFirestore
	) {}

	private connectToFirestore(): void {
		this.firestore
			.collection<Recipe>('recipes')
			.stateChanges()
			.subscribe({
				next: data => {
					data.map(action => {
						const recipe = {
							...action.payload.doc.data(),
							id: action.payload.doc.id,
						};
						const { id } = recipe;
						switch (action.type) {
							case FirebaseActions.Added:
								return this.store.dispatch(
									RecipesActions.serviceAddRecipe({ recipe })
								);
							case FirebaseActions.Removed:
								return this.store.dispatch(
									RecipesActions.serviceRemoveRecipe({ id })
								);
							case FirebaseActions.Modified:
								return this.store.dispatch(
									RecipesActions.serviceModifyRecipe({ recipe })
								);
							default:
								return;
						}
					});
					this.store.dispatch(RecipesActions.loadRecipesSuccess());
				},
			});
	}

	public loadRecipes(): void {
		this.connectToFirestore();
	}
}
