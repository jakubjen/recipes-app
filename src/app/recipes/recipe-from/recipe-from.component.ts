import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import Recipe from '@models/recipe.model';
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
		recipe.ingredients.forEach(() => this.addIngredient());
		recipe.instructions.forEach(() => this.addInstruction());
		this.recipeForm.patchValue(recipe);
	}
	@Output() submitRecipe = new EventEmitter<Recipe>();

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
			Validators.minLength(50),
			Validators.maxLength(2000),
		]),
		time: new FormControl<number | null>(null, [Validators.required]),
		ingredients: new FormArray<FormGroup>([]),
		instructions: new FormArray<FormControl<string>>([]),
	});

	constructor() {}

	public handleSubmit(): void {
		if (this.recipeForm.valid) {
			this.submitRecipe.emit(this.recipeForm.value as Recipe);
		}
	}

	get ingredients() {
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

	get title() {
		return this.recipeForm.get('title');
	}

	get imageUrl() {
		return this.recipeForm.get('imageUrl');
	}

	get description() {
		return this.recipeForm.get('description');
	}

	get time() {
		return this.recipeForm.get('time');
	}
	get instructions() {
		return this.recipeForm.get('instructions') as FormArray;
	}
	public addInstruction(): void {
		this.instructions.push(
			new FormControl<string>('', [
				Validators.required,
				Validators.minLength(50),
				Validators.maxLength(2000),
			])
		);
	}

	public removeInstruction(index: number): void {
		this.instructions.removeAt(index);
	}
}
