import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import FirebaseActions from '@models/firebase-actions.enum';
import Recipe from '@models/recipe.model';
import { Store } from '@ngrx/store';
import appActions from '@store/app/app.actions';
import userActions from '@store/auth/user.actions';
import RecipesActions from '@store/recipes/recipes.actions';
import { AppState } from '@store/store';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
	constructor(
		private firestore: AngularFirestore,
		private store: Store<AppState>
	) {}

	ngOnInit(): void {
		this.store.dispatch(appActions.appInit());
		this.loadRecipes();
	}

	private loadRecipes(): void {
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
									RecipesActions.firestoreAddRecipe({ recipe })
								);
							case FirebaseActions.Removed:
								return this.store.dispatch(
									RecipesActions.firestoreRemoveRecipe({ id })
								);
							case FirebaseActions.Modified:
								return this.store.dispatch(
									RecipesActions.firestoreModifyRecipe({ recipe })
								);
							default:
								return;
						}
					});
					this.store.dispatch(RecipesActions.loadRecipesSuccess());
				},
			});
	}
}
