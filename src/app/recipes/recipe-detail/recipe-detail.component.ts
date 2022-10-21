import {
	animate,
	state,
	style,
	transition,
	trigger,
} from '@angular/animations';
import {
	AfterViewInit,
	Component,
	ElementRef,
	HostListener,
	OnDestroy,
	OnInit,
	TemplateRef,
	ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import DataState from '@models/data-store.enum';
import Ingredients from '@models/ingredients.model';
import Recipe from '@models/recipe.model';
import { User } from '@models/user.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { userSelectors } from '@store/auth/selectors';
import RecipesActions from '@store/recipes/recipes.actions';
import RecipesSelectors from '@store/recipes/recipes.selector';
import { shoppingListActions } from '@store/shopping-list/shopping-list.actions';
import { AppState } from '@store/store';
import {
	debounce,
	filter,
	fromEvent,
	interval,
	Subject,
	takeUntil,
	tap,
	throttle,
	withLatestFrom,
} from 'rxjs';

@Component({
	selector: 'app-recipe-detail',
	templateUrl: './recipe-detail.component.html',
	styleUrls: ['./recipe-detail.component.scss'],
	animations: [
		trigger('openClose', [
			state('open', style({ opacity: 1 })),
			state(
				'closed',
				style({
					height: 0,
					opacity: 0,
				})
			),
			transition('open => closed', [animate('0.3s ease-out')]),
			transition('closed => open', [animate('0.3s ease-out')]),
		]),
	],
})
export class RecipeDetailComponent implements OnInit, OnDestroy, AfterViewInit {
	public recipe?: Recipe;
	private ngDestroyed$ = new Subject();
	public user?: User;
	public readingProgress = 0;
	public progressBarOpen = false;
	@ViewChild('description') description!: ElementRef<HTMLElement>;
	@ViewChild('recipeDetail') recipeDetail!: ElementRef<HTMLElement>;
	constructor(
		private route: ActivatedRoute,
		private store: Store<AppState>,
		private router: Router,
		private modalService: NgbModal
	) {}

	ngOnInit(): void {
		const idOrUrlSlug = this.route.snapshot.paramMap.get('idOrUrlSlug')!;
		this.store
			.select(RecipesSelectors.selectDataState)
			.pipe(
				takeUntil(this.ngDestroyed$),
				filter((state: DataState) => state === DataState.Loaded),
				withLatestFrom(
					this.store.select(RecipesSelectors.selectByIdOrUrlSlug(idOrUrlSlug)),
					this.store.select(userSelectors.selectUser)
				),
				tap(async ([_, recipe, user]) => {
					if (!recipe) this.router.navigate(['/404']);
				})
			)
			.subscribe(([_, recipe, user]) => {
				this.recipe = recipe;
				this.user = user;
			});
	}

	ngAfterViewInit(): void {
		fromEvent(document, 'scroll')
			.pipe(
				takeUntil(this.ngDestroyed$),
				debounce(() => interval(300))
			)
			.subscribe(() => this.calculateReadingProgress());
	}

	public addAllIngredientsToShippingList(ingredients: Ingredients[]): void {
		this.store.dispatch(
			shoppingListActions.addManyIngredientsFromRecipe({
				ingredients,
			})
		);
	}

	public addIngredientToShippingList({
		event,
		ingredient,
	}: {
		event: MouseEvent;
		ingredient: Ingredients;
	}): void {
		(<HTMLElement>event.target).blur();
		this.store.dispatch(
			shoppingListActions.addIngredientFromRecipe({
				ingredient,
			})
		);
	}

	public removeRecipe(modal: TemplateRef<any>): void {
		this.modalService
			.open(modal, { ariaLabelledBy: 'modal-remove-recipe' })
			.result.then(() => {
				this.store.dispatch(
					RecipesActions.removeRecipe({ id: this.recipe!.id })
				);
			})
			.catch(() => {});
	}

	private calculateReadingProgress() {
		const description = this.description.nativeElement;
		const startPoint =
			description.getBoundingClientRect().top +
			(window.pageYOffset ?? document.documentElement.scrollTop);

		const recipeDetail = this.recipeDetail.nativeElement;

		const progres =
			((window.scrollY - startPoint) /
				(recipeDetail.clientHeight -
					window.visualViewport.height -
					startPoint)) *
			100;
		const body = document.body;
		const html = document.documentElement;
		const documentHeight = Math.max(
			body.scrollHeight,
			body.offsetHeight,
			html.clientHeight,
			html.scrollHeight,
			html.offsetHeight
		);

		this.progressBarOpen =
			progres > 0 && documentHeight > startPoint + window.visualViewport.height
				? true
				: false;

		this.readingProgress =
			this.readingProgress < progres
				? Math.round(progres)
				: this.readingProgress;
	}

	public ngOnDestroy(): void {
		this.ngDestroyed$.next('');
		this.ngDestroyed$.complete();
	}
}
