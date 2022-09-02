import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import FirebaseActions from '@models/firebase-actions.enum';
import Recipe, { NewRecipe } from '@models/recipe.model';
import { Store } from '@ngrx/store';
import RecipesActions from '@store/recipes/recipes.actions';
import { AppState } from '@store/store';

@Injectable()
export class RecipesService {
	constructor(
		private store: Store<AppState>,
		private firestore: AngularFirestore,
		private router: Router
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

	public addRecipe(recipe: NewRecipe): void {
		const { id, ...recipeToAdd } = recipe;
		try {
			this.firestore.collection('recipes').add(recipeToAdd);
			this.router.navigate(['/']);
		} catch (err) {}
	}

	public update(recipe: Recipe): void {
		console.log(recipe);

		try {
			this.firestore.doc<Recipe>(`recipes/${recipe.id}`).update(recipe);
			this.router.navigate(['/']);
		} catch (err: any) {}
	}

	public loadRecipes(): void {
		this.connectToFirestore();
	}
}
