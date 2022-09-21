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
			let aNormalized: string | number;
			let bNormalized: string | number;
			if (field === 'time') {
				aNormalized = a[field];
				bNormalized = b[field];
			} else {
				aNormalized = a[field].toString().toLocaleLowerCase();
				bNormalized = b[field].toString().toLocaleLowerCase();
			}
			if (aNormalized > bNormalized) return 1 * sortDirection;
			if (aNormalized < bNormalized) return -1 * sortDirection;

			return 0;
		});
		return recipes;
	}
}
