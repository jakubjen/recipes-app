export default interface Ingredients {
	name: string;
	unit: string;
	amount: string;
}

export interface IngredientsInStore extends Ingredients {
	id: string;
}
