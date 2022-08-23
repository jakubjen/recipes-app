import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import Recipe from '@models/recipe.model';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, of, switchMap, tap } from 'rxjs';
import RecipesActions from '../recipes.actions';

@Injectable()
export class loadRecipesSuccessEffect {
	loadRecipes$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(RecipesActions.loadRecipesSuccess),
			map(action => {
				const { recipe } = action;
				switch (action.action) {
					case 'added':
						return RecipesActions.firestoreAddRecipe({ recipe });
					case 'removed':
						return RecipesActions.firebaseRemoveRecipe({ recipe });
					case 'modified':
						return RecipesActions.firestoreModifyRecipe({ recipe });
					default:
						return {
							type: '',
						};
				}
			})
		);
	});
	constructor(private actions$: Actions, private afs: AngularFirestore) {}
}
