import { animate, style, transition, trigger } from '@angular/animations';
import {
	AfterViewInit,
	Component,
	ElementRef,
	OnDestroy,
	OnInit,
	TemplateRef,
	ViewChild,
} from '@angular/core';
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
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { shoppingListActions } from '@store/shopping-list/shopping-list.actions';
import ShoppingListSelectors from '@store/shopping-list/shopping-list.selectors';
import { first, Observable } from 'rxjs';
import { convertUnit } from 'src/helpers/convertUnits';
import { isNotANumber } from 'src/helpers/is-nan';

@Component({
	selector: 'app-shopping-list',
	templateUrl: './shopping-list.component.html',
	styleUrls: ['./shopping-list.component.scss'],
	animations: [
		trigger('fadeIn', [
			transition('void => *', [
				style({
					height: 0,
					scale: 0,
				}),
				animate('.3s ease-out'),
			]),
			transition('* => void', [
				style({
					scale: 1,
				}),
				animate(
					'.3s ease-out',
					style({
						scale: 0,
						height: 0,
					})
				),
			]),
		]),
	],
})
export class ShoppingListComponent implements OnInit, AfterViewInit, OnDestroy {
	@ViewChild('stickyFrom') stickyForm?: ElementRef;
	public skyFromObserver?: IntersectionObserver;
	public units = IngredientsUnit;
	public ingredientList$?: Observable<IngredientsInStore[] | undefined>;
	public mode: 'add' | 'edit' = 'add';
	public editedIngredient?: IngredientsInStore;
	public ingredientToDelete?: IngredientsInStore;
	public sortKeyEnum = IngredientsSortBy;
	public sortKey?: Observable<IngredientsSortBy>;
	public sortDirection?: Observable<SortDirection>;
	public sortDirectionEnum = SortDirection;

	public ingredientForm = new FormGroup(
		{
			name: new FormControl<string>('', [
				Validators.required,
				Validators.maxLength(256),
			]),
			unit: new FormControl('grams', [Validators.required]),
			amount: new FormControl<string | null>('', [
				Validators.required,
				Validators.min(0),
				Validators.max(30000),
				isNotANumber(),
			]),
		},
		{ updateOn: 'submit' }
	);

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

	ngAfterViewInit(): void {
		this.skyFromObserver = new IntersectionObserver(
			([e]) => {
				e.target.classList.toggle('is-pinned', e.intersectionRatio < 1);
			},
			{ threshold: [1] }
		);
		this.skyFromObserver.observe(this.stickyForm?.nativeElement);
	}

	ngOnDestroy(): void {
		this.skyFromObserver?.disconnect();
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
		this.editedIngredient = ingredient;
		const { amount, unit } = ingredient;
		const convertedUnits = convertUnit({ amount, unit });
		this.ingredientForm.patchValue({
			...ingredient,
			amount: convertedUnits.amount,
			unit: convertedUnits.unit,
		});

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
		(<HTMLElement>document.activeElement)?.blur();
		if (this.mode == 'add') {
			this.store.dispatch(shoppingListActions.addIngredient({ ingredient }));
			ngForm.resetForm();
			return this.ingredientForm.patchValue({ unit: 'grams' });
		}
		if (this.mode == 'edit') {
			this.mode = 'add';
			if (!this.editedIngredient?.id) return ngForm.resetForm();
			const updatedIngredient: IngredientsInStore = {
				id: this.editedIngredient?.id,
				...ingredient,
			};
			this.store.dispatch(
				shoppingListActions.updateIngredient({
					ingredient: updatedIngredient,
					previousIngredient: this.editedIngredient,
				})
			);
			ngForm.resetForm();
			return this.ingredientForm.patchValue({ unit: 'grams' });
		}
	}

	public handleFormRest(
		button: HTMLButtonElement,
		ngForm: FormGroupDirective
	): void {
		ngForm.reset();
		button?.blur();
		this.mode = 'add';
		this.ingredientForm.patchValue({ unit: 'grams' });
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
