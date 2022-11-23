import { animate, style, transition, trigger } from '@angular/animations';
import { Component, Input } from '@angular/core';
import Recipe from '@models/recipe.model';

@Component({
	selector: 'app-recipe-card',
	templateUrl: './recipe-card.component.html',
	styleUrls: ['./recipe-card.component.scss'],
	animations: [
		trigger('fadeIn', [
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
export class RecipeCardComponent {
	@Input() recipe: Recipe | undefined;
	@Input() enableHover: boolean = true;
	@Input() enableEllipsis: boolean = false;
	public imageError = false;

	public imageLodeError() {
		this.imageError = true;
	}
}
