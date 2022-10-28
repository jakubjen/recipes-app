import { Pipe, PipeTransform } from '@angular/core';
import Recipe from '@models/recipe.model';

@Pipe({
	name: 'filterRecipes',
})
export class FilterRecipesPipe implements PipeTransform {
	transform(
		value: Recipe[] | null,
		searchText = '',
		fields: string[]
	): Recipe[] {
		if (!value) return [];
		const searchTextToLowerCase = searchText.toLowerCase();
		if (!fields.length) return value;
		return value.filter(
			recipe =>
				(fields.includes('title') &&
					recipe.title.toLowerCase().includes(searchTextToLowerCase)) ||
				(fields.includes('description') &&
					recipe.description.toLowerCase().includes(searchText))
		);
	}
}
