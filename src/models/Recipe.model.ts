import Ingredients from './Ingredients.model';

export default interface Recipe {
	id: string;
	title: string;
	description: string;
	ingredients: Ingredients[];
	instructions: string;
}
