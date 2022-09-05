import Ingredients from './ingredients.model';

export default interface Recipe {
	id: string;
	title: string;
	description: string;
	imageUrl: string;
	time: number;
	ingredients: Ingredients[];
	instructions: string[];
	ownerId: string;
}

export interface NewRecipe extends Omit<Recipe, 'id' | 'ownerId'> {
	id?: string;
	ownerId?: string;
}
