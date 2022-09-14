import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
	AbstractControl,
	FormArray,
	FormControl,
	FormGroup,
	Validators,
} from '@angular/forms';
import { IngredientsUnit } from '@models/ingredients-units.model';
import Recipe, { NewRecipe } from '@models/recipe.model';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-recipe-from',
	templateUrl: './recipe-from.component.html',
	styleUrls: ['./recipe-from.component.scss'],
})
export class RecipeFromComponent {
	@Input() action: string = '';
	@Input() loading: boolean = false;
	@Input() processingData$?: Observable<boolean | undefined>;
	@Input() set recipe(recipe: Recipe) {
		this.ingredients.clear();
		this.instructions.clear();
		recipe.ingredients.forEach(() => this.addIngredient());
		recipe.instructions.forEach(() => this.addInstruction());
		this.recipeForm.patchValue(recipe);
		this.recipeId = recipe.id;
		this.imageUrl = recipe.imageUrl;
		this.recipeForm.controls.image.removeValidators(Validators.required);
	}

	@Output() submitRecipe = new EventEmitter<{
		recipe: NewRecipe;
		image: File | null | undefined;
	}>();

	private recipeId?: string;
	private imageUrl = '';
	public units = IngredientsUnit;

	public recipeForm = new FormGroup({
		title: new FormControl<string>('', [
			Validators.required,
			Validators.minLength(10),
			Validators.maxLength(200),
		]),
		image: new FormControl<File | null>(null, Validators.required),
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

	get ingredients(): FormArray {
		return this.recipeForm.get('ingredients') as FormArray;
	}
	get title(): AbstractControl<string | null, string | null> | null {
		return this.recipeForm.get('title');
	}
	get image(): AbstractControl | null {
		return this.recipeForm.get('image');
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

	public onFileChanged(event: Event): void {
		const image = (event.target as HTMLInputElement).files?.[0];
		if (!!image) this.recipeForm.patchValue({ image });
	}

	public handleSubmit(): void {
		if (this.recipeForm.valid) {
			const { image, ...valuesFromFrom } = this.recipeForm.value;
			const recipe = {
				...valuesFromFrom,
				imageUrl: this.imageUrl,
				id: this.recipeId,
			} as NewRecipe;

			this.submitRecipe.emit({ recipe, image });
		}
	}
}
