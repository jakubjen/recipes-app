import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IngredientsUnit } from '@models/ingredients-units.model';
import Ingredients, { IngredientsInStore } from '@models/ingredients.model';
import { Store } from '@ngrx/store';
import { shoppingListActions } from '@store/shopping-list/shopping-list.actions';
import ShoppingListSelectors from '@store/shopping-list/shopping-list.selectors';
import { AppState } from '@store/store';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-shopping-list',
	templateUrl: './shopping-list.component.html',
	styleUrls: ['./shopping-list.component.scss'],
})
export class ShoppingListComponent implements OnInit {
	public units = IngredientsUnit;
	public ingredientList$?: Observable<IngredientsInStore[]>;
	public mode: 'add' | 'edit' = 'add';
	public editingIngredientId?: string;

	public ingredientForm = new FormGroup({
		name: new FormControl<string>('', Validators.required),
		unit: new FormControl('grams', Validators.required),
		amount: new FormControl<string | null>(null, [
			Validators.required,
			Validators.min(0),
		]),
	});

	get submitButtonText() {
		return this.mode == 'add'
			? 'Recipes.AddIngredient'
			: 'Recipes.EditIngredient';
	}
	get name(): FormControl {
		return this.ingredientForm.controls.name;
	}

	get amount(): FormControl {
		return this.ingredientForm.controls.amount;
	}

	constructor(private state: Store<AppState>) {}

	ngOnInit(): void {
		this.ingredientList$ = this.state.select(ShoppingListSelectors.selectAll);
	}

	public removeIngredient(id: string): void {
		this.state.dispatch(shoppingListActions.removeIngredient({ id }));
	}

	public editIngredient(ingredient: IngredientsInStore): void {
		this.editingIngredientId = ingredient.id;
		this.ingredientForm.patchValue(ingredient);
		this.mode = 'edit';
	}

	public submit(): void {
		if (!this.ingredientForm.value) return;
		const { name, unit, amount } = this.ingredientForm.value;
		const ingredient: Ingredients = {
			name: name!,
			unit: unit!,
			amount: amount!.toString(),
		};

		if (this.mode == 'add') {
			this.state.dispatch(shoppingListActions.addIngredient({ ingredient }));
			return;
		}
		if (this.mode == 'edit') {
			this.mode = 'add';
			if (!this.editingIngredientId) return;
			const updatedIngredient: IngredientsInStore = {
				id: this.editingIngredientId,
				...ingredient,
			};
			this.state.dispatch(
				shoppingListActions.updateIngredient({ ingredient: updatedIngredient })
			);
		}
	}
}
