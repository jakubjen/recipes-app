import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import Recipe from '@models/recipe.model';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap, mergeMap } from 'rxjs';
import RecipesActions from '../recipes.actions';

@Injectable()
export class loadRecipeEffect {
	loadRecipes$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(RecipesActions.loadRecipes),
			switchMap(action => {
				return this.afs.collection<Recipe>('recipes').stateChanges();
			}),
			mergeMap(actions => actions),
			map(action => {
				const recipe: Recipe = {
					...action.payload.doc.data(),
					id: action.payload.doc.id,
				};
				return RecipesActions.loadRecipesSuccess({
					action: action.type,
					recipe,
				});
			})
		);
	});
	constructor(private actions$: Actions, private afs: AngularFirestore) {}
}

// })
