import { Pipe, PipeTransform } from '@angular/core';
import Recipe from '@models/recipe.model';

@Pipe({
	name: 'filterRecipes',
})
export class FilterRecipesPipe implements PipeTransform {
	transform(value: Recipe[] | null, searchText = ''): Recipe[] {
		if (!value) return [];
		const searchTextToLowerCase = searchText.toLowerCase();
		return value.filter(
			recipe =>
				recipe.title.toLowerCase().includes(searchTextToLowerCase) ||
				recipe.description.toLowerCase().includes(searchTextToLowerCase)
		);
	}
}
