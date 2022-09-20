import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import Recipe from '@models/recipe.model';
import { SnackbarVariant } from '@models/snackbar.model';
import { Actions, createEffect, ofType, concatLatestFrom } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '@services/auth/auth.service';
import { userSelectors } from '@store/auth/selectors';
import SnackbarActions from '@store/shared/snackbar.actions';
import { AppState } from '@store/store';
import { map, mergeMap, withLatestFrom } from 'rxjs';
import RecipesActions from '../recipes.actions';

@Injectable()
export class RecipeEffects {
	constructor(
		private actions$: Actions,
		private authService: AuthService,
		private router: Router,
		private translate: TranslateService,
		private firestore: AngularFirestore,
		private store: Store<AppState>
	) {}

	addRecipes$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(RecipesActions.addRecipe),
			concatLatestFrom(() => this.store.select(userSelectors.selectUser)),
			mergeMap(async ([action, user]) => {
				const { id, ...newRecipe } = action.recipe;
				if (!user) {
					return RecipesActions.addRecipeFailed(
						this.translate.instant('App.Snackbar.UserNotAuthorized')
					);
				}
				newRecipe.ownerId = user.uid;
				try {
					this.firestore.collection('recipes').add(newRecipe);
					this.router.navigate(['/']);
					return RecipesActions.addRecipeSuccess();
				} catch (err: any) {
					return RecipesActions.addRecipeFailed({ text: err.message });
				}
			})
		);
	});

	loadRecipesSuccess$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(RecipesActions.addRecipeSuccess),
			mergeMap(async () => {
				return SnackbarActions.createSnackbar({
					variant: SnackbarVariant.Success,
					text: this.translate.instant('App.Snackbar.RecipeAddedSuccessfully'),
				});
			})
		);
	});

	loadRecipesFailed$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(RecipesActions.addRecipeFailed),
			mergeMap(async () => {
				return SnackbarActions.createSnackbar({
					variant: SnackbarVariant.Error,
					text: this.translate.instant('App.Snackbar.UserNotAuthorized'),
				});
			})
		);
	});

	removeRecipe$ = createEffect(
		() => {
			return this.actions$.pipe(
				ofType(RecipesActions.removeRecipe),
				mergeMap(async action => {
					try {
						await this.firestore.doc<Recipe>(`recipes/${action.id}`).delete();
						this.router.navigate(['/']);
						return RecipesActions.removeRecipeSuccess();
					} catch (err: any) {
						console.log(err);
						return RecipesActions.removeRecipeFailed({ text: err.message });
					}
				})
			);
		},
		{ dispatch: false }
	);

	removeRecipeSuccess$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(RecipesActions.removeRecipeSuccess),
			mergeMap(async () => {
				return SnackbarActions.createSnackbar({
					variant: SnackbarVariant.Success,
					text: this.translate.instant('App.Snackbar.RecipeRemoveSuccessfully'),
				});
			})
		);
	});

	removeRecipeFailed$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(RecipesActions.removeRecipeFailed),
			map(action =>
				SnackbarActions.createSnackbar({
					variant: SnackbarVariant.Error,
					text: action.text,
				})
			)
		);
	});

	updateRecipe$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(RecipesActions.updateRecipe),
			mergeMap(async action => {
				const { recipe } = action;
				try {
					await this.firestore
						.doc<Recipe>(`recipes/${recipe.id}`)
						.update(recipe);

					this.router.navigate([`/recipe/${recipe.id}`]);

					return SnackbarActions.createSnackbar({
						variant: SnackbarVariant.Success,
						text: this.translate.instant(
							'App.Snackbar.RecipeUpdatedSuccessfully'
						),
					});
				} catch (err: any) {
					return SnackbarActions.createSnackbar({
						variant: SnackbarVariant.Error,
						text: err.message,
					});
				}
			})
		);
	});
}
