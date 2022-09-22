import { Injectable } from '@angular/core';
import { AngularFireAnalytics } from '@angular/fire/compat/analytics';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import Recipe from '@models/recipe.model';
import { SnackbarVariant } from '@models/snackbar.model';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { userSelectors } from '@store/auth/selectors';
import SnackbarActions from '@store/shared/snackbar.actions';
import { AppState } from '@store/store';

import { RecipesService } from '@services/recipes/recipes.service';
import { firstValueFrom, map, mergeMap } from 'rxjs';
import RecipesActions from '../recipes.actions';

@Injectable()
export class RecipeEffects {
	constructor(
		private actions$: Actions,
		private router: Router,
		private translate: TranslateService,
		private firestore: AngularFirestore,
		private store: Store<AppState>,
		private analytics: AngularFireAnalytics,
		private recipesService: RecipesService
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
					this.analytics.logEvent('add_recipe', {
						ingredientsNumber: newRecipe.ingredients.length,
						stepsNumber: newRecipe.instructions.length,
					});
					const document = await this.firestore
						.collection('recipes')
						.add(newRecipe);
					const recipeId = await document.id;
					newRecipe.imageUrl = await firstValueFrom(
						await this.recipesService.uploadImage(action.image, recipeId, user)
					);
					document.update(newRecipe);
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

	removeRecipe$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(RecipesActions.removeRecipe),
			concatLatestFrom(() => this.store.select(userSelectors.selectUser)),
			mergeMap(async ([action, user]) => {
				try {
					await this.firestore.doc<Recipe>(`recipes/${action.id}`).delete();
					const imagePath = `${user!.uid}/${action.id}.jpg`;
					this.recipesService.deleteImage(imagePath);
					this.router.navigate(['/']);
					return RecipesActions.removeRecipeSuccess();
				} catch (err: any) {
					return RecipesActions.removeRecipeFailed({ text: err.message });
				}
			})
		);
	});

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
			concatLatestFrom(() => this.store.select(userSelectors.selectUser)),
			mergeMap(async ([action, user]) => {
				const { image } = action;
				const { ...recipe } = action.recipe;
				try {
					if (!!image) {
						recipe.imageUrl = await firstValueFrom(
							await this.recipesService.uploadImage(image, recipe.id, user!)
						);
					}
					await this.firestore
						.doc<Recipe>(`recipes/${recipe.id}`)
						.update(recipe);

					this.router.navigate([`/recipe/${recipe.id}`]);

					return RecipesActions.updateRecipeSuccess();
				} catch (err: any) {
					return RecipesActions.updateRecipeFailed({ text: err.message });
				}
			})
		);
	});

	updateRecipeSuccess$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(RecipesActions.updateRecipeSuccess),
			map(action =>
				SnackbarActions.createSnackbar({
					variant: SnackbarVariant.Success,
					text: this.translate.instant(
						'App.Snackbar.RecipeUpdatedSuccessfully'
					),
				})
			)
		);
	});

	updateRecipeFailed$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(RecipesActions.updateRecipeFailed),
			map(action =>
				SnackbarActions.createSnackbar({
					variant: SnackbarVariant.Error,
					text: action.text,
				})
			)
		);
	});
}
