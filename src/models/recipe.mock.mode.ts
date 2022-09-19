import Recipe from './recipe.model';

const recipeOne: Recipe = {
	id: '2r32r3rfwef3f32f32d',
	title: 'Zupa',
	description: 'Opis',
	imageUrl: 'http://cos.cos.example',
	time: 431,
	ingredients: [
		{
			name: 'cucumber',
			amount: '13',
			unit: 'slice',
		},
		{
			name: 'potato',
			amount: '4',
			unit: 'kilogram',
		},
	],
	instructions: ['cos', 'something'],
	ownerId: '3fg4g55243123',
};

const recipeTwo: Recipe = {
	id: 'dfwefewfwfwef  wef w',
	title: 'Mielonw',
	description: 'obuvbovbow',
	imageUrl: 'http://examplw.cos.zupa',
	time: 31,
	ingredients: [
		{
			name: 'czosnek',
			amount: '30',
			unit: 'grams',
		},
		{
			name: 'carbon',
			amount: '1',
			unit: 'spoon',
		},
	],
	instructions: ['23r', 'sadSD'],
	ownerId: '3fg4g55243123',
};

export const mockRecipes = { recipeOne, recipeTwo };
