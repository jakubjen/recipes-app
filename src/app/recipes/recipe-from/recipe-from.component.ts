import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
	FormControl,
	FormGroup,
	FormArray,
	Validators,
	AbstractControl,
} from '@angular/forms';
import Recipe, { NewRecipe } from '@models/recipe.model';
import { IngredientsUnit } from '@models/ingredients-units.model';

@Component({
	selector: 'app-recipe-from',
	templateUrl: './recipe-from.component.html',
	styleUrls: ['./recipe-from.component.scss'],
})
export class RecipeFromComponent {
	@Input() action: string = '';
	@Input() loading: boolean = false;
	@Input() set recipe(recipe: Recipe) {
		this.ingredients.clear();
		this.instructions.clear();
		recipe.ingredients.forEach(() => this.addIngredient());
		recipe.instructions.forEach(() => this.addInstruction());
		this.recipeForm.patchValue(recipe);
		this.recipeId = recipe.id;
	}
	private recipeId?: string;

	@Output() submitRecipe = new EventEmitter<NewRecipe>();

	public units = IngredientsUnit;

	public recipeForm = new FormGroup({
		title: new FormControl<string>('', [
			Validators.required,
			Validators.minLength(10),
			Validators.maxLength(200),
		]),
		imageUrl: new FormControl<string>('', [
			Validators.required,
			Validators.minLength(10),
			Validators.maxLength(200),
		]),
		description: new FormControl<string>('', [
			Validators.required,
			Validators.minLength(20),
			Validators.maxLength(2000),
		]),
		time: new FormControl<number | null>(null, [
			Validators.required,
			Validators.min(1),
		]),
		ingredients: new FormArray<FormGroup>([]),
		instructions: new FormArray<FormControl<string>>([]),
	});

	public handleSubmit(): void {
		if (this.recipeForm.valid) {
			this.submitRecipe.emit({
				...this.recipeForm.value,
				id: this.recipeId,
			} as NewRecipe);
		}
	}

	get ingredients(): FormArray {
		return this.recipeForm.get('ingredients') as FormArray;
	}

	public addIngredient(): void {
		const ingredientsForm = new FormGroup({
			amount: new FormControl<number | null>(null, [Validators.required]),
			unit: new FormControl<string>('kilogram'),
			name: new FormControl<string>('', [Validators.required]),
		});
		this.ingredients.push(ingredientsForm);
	}

	public removeIngredient(index: number): void {
		this.ingredients.removeAt(index);
	}

	get title(): AbstractControl<string | null, string | null> | null {
		return this.recipeForm.get('title');
	}

	get imageUrl(): AbstractControl<string | null, string | null> | null {
		return this.recipeForm.get('imageUrl');
	}

	get description(): AbstractControl<string | null, string | null> | null {
		return this.recipeForm.get('description');
	}

	get time(): AbstractControl<number | null, number | null> | null {
		return this.recipeForm.get('time');
	}
	get instructions(): FormArray {
		return this.recipeForm.get('instructions') as FormArray;
	}
	public addInstruction(): void {
		this.instructions.push(
			new FormControl<string>('', [
				Validators.required,
				Validators.minLength(20),
				Validators.maxLength(2000),
			])
		);
	}

	public removeInstruction(index: number): void {
		this.instructions.removeAt(index);
	}
}
