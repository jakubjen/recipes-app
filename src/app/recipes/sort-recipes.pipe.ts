import { Pipe, PipeTransform } from '@angular/core';
import Recipe from '@models/recipe.model';
import SortDirection from '@models/sort-direction';

@Pipe({
	name: 'sortRecipes',
})
export class SortRecipesPipe implements PipeTransform {
	transform(
		recipes: Recipe[],
		field: keyof Recipe,
		sortDirection: SortDirection
	): Recipe[] {
		recipes.sort((a, b) => {
			if (a[field] > b[field]) {
				return 1;
			}
			if (a[field] < b[field]) {
				return -1;
			}
			return 0;
		});
		return sortDirection === SortDirection.ASC ? recipes : recipes.reverse();
	}
}
