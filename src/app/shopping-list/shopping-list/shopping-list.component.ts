import {
	animate,
	state,
	style,
	transition,
	trigger,
} from '@angular/animations';
import { Component, OnInit, TemplateRef } from '@angular/core';
import {
	FormControl,
	FormGroup,
	FormGroupDirective,
	Validators,
} from '@angular/forms';
import { IngredientsUnit } from '@models/ingredients-units.model';
import Ingredients, {
	IngredientsInStore,
	IngredientsSortBy,
} from '@models/ingredients.model';
import SortDirection from '@models/sort-direction.ts';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { shoppingListActions } from '@store/shopping-list/shopping-list.actions';
import ShoppingListSelectors from '@store/shopping-list/shopping-list.selectors';
import { AppState } from '@store/store';
import { first, tap, Observable, take } from 'rxjs';

@Component({
	selector: 'app-shopping-list',
	templateUrl: './shopping-list.component.html',
	styleUrls: ['./shopping-list.component.scss'],
	animations: [
		trigger('recipeSate', [
			transition('void => *', [
				style({
					opacity: 0,
				}),
				animate('1s'),
			]),
			transition('* => void', [
				style({
					opacity: 1,
				}),
				animate(
					'1s ease-out',
					style({
						opacity: 0,
					})
				),
			]),
		]),
	],
})
export class ShoppingListComponent implements OnInit {
	public units = IngredientsUnit;
	public ingredientList$?: Observable<IngredientsInStore[] | undefined>;
	public mode: 'add' | 'edit' = 'add';
	public editingIngredientId?: string;
	public ingredientToDelete?: IngredientsInStore;
	public sortKeyEnum = IngredientsSortBy;
	public sortKey?: Observable<IngredientsSortBy>;
	public sortDirection?: Observable<SortDirection>;
	public sortDirectionEnum = SortDirection;

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

	constructor(private store: Store, private modalService: NgbModal) {}

	ngOnInit(): void {
		this.ingredientList$ = this.store.select(
			ShoppingListSelectors.selectFilteredAndSortedIngredients
		);

		this.sortKey = this.store.select(ShoppingListSelectors.selectSortedKey);
		this.sortDirection = this.store.select(
			ShoppingListSelectors.selectSortDirection
		);
	}

	public setQueryString(queryString: string): void {
		this.store.dispatch(shoppingListActions.setQueryString({ queryString }));
	}

	public removeIngredient(
		ingredient: IngredientsInStore,
		modal: TemplateRef<any>
	): void {
		this.ingredientToDelete = ingredient;
		this.modalService
			.open(modal, { ariaLabelledBy: 'modal-basic-title' })
			.result.then(() => {
				this.store.dispatch(
					shoppingListActions.removeIngredient({ id: ingredient.id })
				);
			})
			.catch(() => {});
	}

	public editIngredient(ingredient: IngredientsInStore): void {
		this.editingIngredientId = ingredient.id;
		this.ingredientForm.patchValue(ingredient);
		this.mode = 'edit';
	}

	public submit(ngForm: FormGroupDirective): void {
		if (!this.ingredientForm.valid) return;
		const { name, unit, amount } = this.ingredientForm.value;

		const ingredient: Ingredients = {
			name: name!,
			unit: unit!,
			amount: amount!.toString(),
		};

		if (this.mode == 'add') {
			this.store.dispatch(shoppingListActions.addIngredient({ ingredient }));
			return ngForm.resetForm();
		}
		if (this.mode == 'edit') {
			this.mode = 'add';
			if (!this.editingIngredientId) return ngForm.resetForm();
			const updatedIngredient: IngredientsInStore = {
				id: this.editingIngredientId,
				...ingredient,
			};
			this.store.dispatch(
				shoppingListActions.updateIngredient({ ingredient: updatedIngredient })
			);
			return ngForm.resetForm();
		}
	}

	public changeSortKey(sortKey: IngredientsSortBy): void {
		this.store
			.select(ShoppingListSelectors.selectSortedKey)
			.pipe(first())
			.subscribe(sortedBy => {
				this.store.dispatch(shoppingListActions.setSortKey({ sortKey }));
				if (sortedBy === sortKey)
					this.store.dispatch(shoppingListActions.toggleDirection());
				else
					this.store.dispatch(
						shoppingListActions.setSortDirection({
							sortDirection: SortDirection.ASC,
						})
					);
			});
	}
}
