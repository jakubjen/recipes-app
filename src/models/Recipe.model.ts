import Ingredients from './ingredients.model';

export default interface Recipe {
	id: string;
	title: string;
	description: string;
	imageUrl: string;
	time: number;
	ingredients: Ingredients[];
	instructions: string[];
}

export interface NewRecipe extends Omit<Recipe, 'id'> {
	id?: string;
}
