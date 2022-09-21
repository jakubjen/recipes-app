import { mockRecipes } from '@models/recipe.mock.mode';
import SortDirection from '@models/sort-direction';
import { SortRecipesPipe } from './sort-recipes.pipe';

describe('SortRecipesPipe', () => {
	const pipe = new SortRecipesPipe();

	it('create an instance', () => {
		expect(pipe).toBeTruthy();
	});

	it('should sort recipes array by title', () => {
		let recipes = [mockRecipes.recipeOne, mockRecipes.recipeTwo];
		console.log(pipe.transform(recipes, 'title', SortDirection.ASC));
		expect(pipe.transform(recipes, 'title', SortDirection.ASC)).toEqual([
			mockRecipes.recipeTwo,
			mockRecipes.recipeOne,
		]);

		recipes = [mockRecipes.recipeTwo, mockRecipes.recipeOne];
		expect(pipe.transform(recipes, 'title', SortDirection.DESC)).toEqual([
			mockRecipes.recipeOne,
			mockRecipes.recipeTwo,
		]);
	});
	it('should sort recipes array by time', () => {
		let recipes = [mockRecipes.recipeOne, mockRecipes.recipeTwo];
		console.log(pipe.transform(recipes, 'time', SortDirection.ASC));
		expect(pipe.transform(recipes, 'time', SortDirection.ASC)).toEqual([
			mockRecipes.recipeTwo,
			mockRecipes.recipeOne,
		]);

		recipes = [mockRecipes.recipeTwo, mockRecipes.recipeOne];
		expect(pipe.transform(recipes, 'time', SortDirection.DESC)).toEqual([
			mockRecipes.recipeOne,
			mockRecipes.recipeTwo,
		]);
	});
});
