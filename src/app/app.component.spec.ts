import { Component } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { RouterTestingModule } from '@angular/router/testing';
import FirebaseActions from '@models/firebase-actions.enum';
import { mockRecipes } from '@models/recipe.mock.mode';
import Recipe from '@models/recipe.model';
import { Store } from '@ngrx/store';
import appActions from '@store/app.actions';
import RecipesActions from '@store/recipes/recipes.actions';
import { from } from 'rxjs';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
	const stateChanges: {
		type: FirebaseActions;
		payload: { doc: { data: () => Recipe; id: string } };
	}[] = [
		{
			type: FirebaseActions.Added,
			payload: {
				doc: {
					data() {
						return mockRecipes.recipeOne;
					},
					id: mockRecipes.recipeOne.id,
				},
			},
		},
		{
			type: FirebaseActions.Modified,
			payload: {
				doc: {
					data() {
						return mockRecipes.recipeOne;
					},
					id: mockRecipes.recipeTwo.id,
				},
			},
		},
	];

	let mockStore: any;
	let angularFirestoreStub: any;
	let fixture: ComponentFixture<AppComponent>;
	let component: AppComponent;
	@Component({
		selector: 'app-header',
		template: '<p>Mock Header/p>',
	})
	class HeaderComponent {}
	@Component({
		selector: 'app-notifications',
		template: '<p>Mock notification</p>',
	})
	class NotificationsComponent {}

	beforeEach(waitForAsync(() => {
		const data = from([stateChanges]);

		angularFirestoreStub = {
			collection: () => {
				return {
					stateChanges: jasmine.createSpy().and.returnValue(data),
				};
			},
		};

		mockStore = {
			dispatch: jasmine.createSpy(),
		};

		TestBed.configureTestingModule({
			imports: [RouterTestingModule],
			declarations: [AppComponent, HeaderComponent, NotificationsComponent],
			providers: [
				{ provide: Store, useValue: mockStore },
				{ provide: AngularFirestore, useValue: angularFirestoreStub },
			],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(AppComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create the app', () => {
		const fixture = TestBed.createComponent(AppComponent);
		const app = fixture.componentInstance;
		expect(app).toBeTruthy();
	});

	it('should dispatch actions 4 times', () => {
		expect(mockStore.dispatch).toHaveBeenCalledTimes(4);
	});

	it('should dispatch appInit', () => {
		expect(mockStore.dispatch).toHaveBeenCalledWith(appActions.appInit());
	});

	it('should dispatch actions to add recipes to store', () => {
		expect(mockStore.dispatch).toHaveBeenCalledWith(
			RecipesActions.firestoreAddRecipe({
				recipe: mockRecipes.recipeOne,
			})
		);
		expect(mockStore.dispatch).toHaveBeenCalledWith(
			RecipesActions.firestoreAddRecipe({
				recipe: mockRecipes.recipeOne,
			})
		);
	});

	it('should dispatch recipeLoadSuccess', () => {
		expect(mockStore.dispatch).toHaveBeenCalledWith(
			RecipesActions.loadRecipesSuccess()
		);
	});
});
