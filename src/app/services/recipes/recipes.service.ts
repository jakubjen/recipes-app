import { Injectable } from '@angular/core';
import { async } from '@angular/core/testing';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import FirebaseActions from '@models/firebase-actions.enum';
import Recipe, { NewRecipe } from '@models/recipe.model';
import { SnackbarType } from '@models/snackbar.model';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '@services/auth/auth.service';
import { SnackbarService } from '@services/shared/snackbar.service';
import RecipesActions from '@store/recipes/recipes.actions';
import { AppState } from '@store/store';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class RecipesService {
	constructor(
		private store: Store<AppState>,
		private firestore: AngularFirestore,
		private router: Router,
		private snackbar: SnackbarService,
		private authService: AuthService,
		private translate: TranslateService
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

	public async addRecipe(recipe: NewRecipe) {
		const { id, ...recipeToAdd } = recipe;

		const user = await this.authService.getUser();
		if (!user) {
			this.snackbar.addSnackbar(
				SnackbarType.Error,
				await firstValueFrom(
					this.translate.get('App.Snackbar.UserNotAuthorized')
				)
			);
			return;
		}
		recipeToAdd.ownerId = user.uid;
		try {
			this.firestore.collection('recipes').add(recipeToAdd);
			this.router.navigate(['/']);
			this.snackbar.addSnackbar(
				SnackbarType.Success,
				await firstValueFrom(
					this.translate.get('App.Snackbar.RecipeAddedSuccessfully')
				)
			);
		} catch (err: any) {
			this.snackbar.addSnackbar(SnackbarType.Error, err.message);
		}
	}

	public async update(recipe: Recipe) {
		try {
			await this.firestore.doc<Recipe>(`recipes/${recipe.id}`).update(recipe);
			this.router.navigate([`/recipe/${recipe.id}`]);
			this.snackbar.addSnackbar(
				SnackbarType.Success,
				await firstValueFrom(
					this.translate.get('App.Snackbar.RecipeUpdatedSuccessfully')
				)
			);
		} catch (err: any) {
			this.snackbar.addSnackbar(SnackbarType.Error, err.message);
		}
	}

	public loadRecipes(): void {
		this.connectToFirestore();
	}

	public async removeRecipe(id: string) {
		try {
			await this.firestore.doc<Recipe>(`recipes/${id}`).delete();
			this.router.navigate(['/']);
			this.snackbar.addSnackbar(
				SnackbarType.Success,
				await firstValueFrom(
					this.translate.get('App.Snackbar.RecipeRemoveSuccessfully')
				)
			);
		} catch (err: any) {
			this.snackbar.addSnackbar(SnackbarType.Error, err.message);
		}
	}
}
