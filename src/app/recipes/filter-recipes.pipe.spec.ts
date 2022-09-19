import { mockRecipes } from '@models/recipe.mock.mode';
import Recipe from '@models/recipe.model';
import { FilterRecipesPipe } from './filter-recipes.pipe';

describe('FilterRecipesPipe', () => {
	const recipes: Recipe[] = [mockRecipes.recipeOne, mockRecipes.recipeTwo];
	const pipe = new FilterRecipesPipe();

	it('create an instance', () => {
		expect(pipe).toBeTruthy();
	});

	it('should filter by title', () => {
		expect(pipe.transform(recipes, mockRecipes.recipeTwo.title)).not.toEqual([
			mockRecipes.recipeOne,
		]);

		expect(pipe.transform(recipes, mockRecipes.recipeTwo.title)).toEqual([
			mockRecipes.recipeTwo,
		]);
	});

	it('should filter by descriptions', () => {
		expect(
			pipe.transform(recipes, mockRecipes.recipeTwo.description)
		).not.toEqual([mockRecipes.recipeOne]);

		expect(pipe.transform(recipes, mockRecipes.recipeTwo.description)).toEqual([
			mockRecipes.recipeTwo,
		]);
	});
});
