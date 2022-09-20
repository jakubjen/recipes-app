import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import Recipe from '@models/recipe.model';

@Injectable()
export class RecipesService {
	constructor(private firestore: AngularFirestore) {}

	public addRecipe(recipe: Recipe): void {
		this.firestore.collection<Recipe>('recipes').add(recipe);
	}
}
