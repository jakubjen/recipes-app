import { Component, OnInit } from '@angular/core';
import Recipe, { NewRecipe } from '@models/recipe.model';
import { Store } from '@ngrx/store';
import RecipesActions from '@store/recipes/recipes.actions';
import RecipesSelectors from '@store/recipes/recipes.selector';
import { AppState } from '@store/store';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-recipes-add',
	templateUrl: './recipes-add.component.html',
	styleUrls: ['./recipes-add.component.scss'],
})
export class RecipesAddComponent implements OnInit {
	public processingData$?: Observable<boolean>;

	constructor(private store: Store<AppState>) {}

	ngOnInit(): void {
		this.processingData$ = this.store.select(
			RecipesSelectors.selectProcessingData
		);
	}

	addRecipe({ recipe, image }: { recipe: NewRecipe; image?: File | null }) {
		this.store.dispatch(RecipesActions.addRecipe({ recipe, image: image! }));
	}
}
