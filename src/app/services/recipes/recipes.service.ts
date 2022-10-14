import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import Recipe from '@models/recipe.model';
import { User } from '@models/user.model';
import { Observable } from 'rxjs';

@Injectable()
export class RecipesService {
	constructor(
		private firestore: AngularFirestore,
		private storage: AngularFireStorage
	) {}

	public addRecipe(recipe: Recipe): void {
		this.firestore.collection<Recipe>('recipes').add(recipe);
	}

	public async uploadImage(
		image: Blob,
		recipeId: string,
		user: User
	): Promise<Observable<string>> {
		const path = `${user.uid}/${recipeId}.jpg`;
		const ref = this.storage.ref(path);
		await ref.put(image);
		return ref.getDownloadURL();
	}

	public async deleteImage(path: string) {
		const image = this.storage.ref(path);
		await image.delete();
	}
}
