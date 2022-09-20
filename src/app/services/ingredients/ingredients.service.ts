import { Injectable } from '@angular/core';
import { IngredientsUnit } from '@models/ingredients-units.model';
import Ingredients, { IngredientsInStore } from '@models/ingredients.model';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
	providedIn: 'root',
})
export class IngredientsService {
	constructor() {}

	private createInStoreIngredientFromIngredient(
		ingredient: Ingredients
	): IngredientsInStore {
		return {
			id: uuidv4(),
			...ingredient,
		};
	}

	private normalizeUnits(ingredient: IngredientsInStore): IngredientsInStore {
		if (Object.keys(IngredientsUnit.weight).includes(ingredient.unit)) {
			const multiplayer =
				IngredientsUnit.weight[
					<keyof typeof IngredientsUnit.weight>ingredient.unit
				];
			ingredient.amount = (Number(ingredient.amount) * multiplayer).toString();
			ingredient.unit = 'grams';
		}

		if (Object.keys(IngredientsUnit.volume).includes(ingredient.unit)) {
			const multiplayer =
				IngredientsUnit.volume[
					<keyof typeof IngredientsUnit.volume>ingredient.unit
				];
			ingredient.amount = (Number(ingredient.amount) * multiplayer).toString();
			ingredient.unit = 'milliliter';
		}
		return ingredient;
	}

	public addIngredientAndGroupe(
		ingredient: Ingredients,
		ingredientsInStore: IngredientsInStore[]
	): IngredientsInStore[] {
		const newIngredient: IngredientsInStore = this.normalizeUnits(
			this.createInStoreIngredientFromIngredient(ingredient)
		);

		const ingredientWithSameName = ingredientsInStore.filter(
			ingredient => newIngredient.name === ingredient!.name
		)[0];

		if (!!ingredientWithSameName) {
			newIngredient.amount = (
				+ingredientWithSameName.amount + +newIngredient.amount
			).toString();
		}

		let ingredientsToStore = ingredientsInStore.filter(
			ingredient => ingredient != ingredientWithSameName
		);

		ingredientsToStore.push(newIngredient);

		return ingredientsToStore;
	}
}