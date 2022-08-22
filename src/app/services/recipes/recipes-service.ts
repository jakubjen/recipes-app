import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Constants from 'src/app/constants';
import Recipe from '@models/Recipe.model';

@Injectable({
	providedIn: 'root',
})
export class RecipesService {
	private recipeUrl = Constants.API.BASE_URL + Constants.API.RECIPES_URL;
	constructor(private http: HttpClient) {}

	public fetchRecipes(): Observable<Recipe[]> {
		return this.http.get<Recipe[]>(this.recipeUrl);
	}

	public addRecipe(recipe: Recipe): Observable<Recipe> {
		return this.http.post<Recipe>(this.recipeUrl, recipe);
	}

	public deleteRecipe(id: string): Observable<'ok'> {
		return this.http.delete<'ok'>(`${this.recipeUrl}/${id}`);
	}

	public updateRecipe(recipe: Recipe): Observable<Recipe> {
		return this.http.patch<Recipe>(this.recipeUrl + recipe.id, recipe);
	}
}
