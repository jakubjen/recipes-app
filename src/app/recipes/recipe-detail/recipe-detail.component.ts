import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
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
import { filter, Subject, takeUntil, tap, withLatestFrom } from 'rxjs';

@Component({
	selector: 'app-recipe-detail',
	templateUrl: './recipe-detail.component.html',
	styleUrls: ['./recipe-detail.component.scss'],
})
export class RecipeDetailComponent implements OnInit, OnDestroy {
	public recipe?: Recipe;
	private ngDestroyed$ = new Subject();
	public user?: User;
	constructor(
		private route: ActivatedRoute,
		private store: Store<AppState>,
		private router: Router,
		private modalService: NgbModal
	) {}

	ngOnInit(): void {
		const idOrUlrSlug = this.route.snapshot.paramMap.get('idOrUrlSlug')!;

		this.store
			.select(RecipesSelectors.selectDataState)
			.pipe(
				takeUntil(this.ngDestroyed$),
				filter((state: DataState) => state === DataState.Loaded),
				withLatestFrom(
					this.store.select(RecipesSelectors.selectByIdOrUrlSlug(idOrUlrSlug)),
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

	public ngOnDestroy(): void {
		this.ngDestroyed$.next('');
		this.ngDestroyed$.complete();
	}
}
