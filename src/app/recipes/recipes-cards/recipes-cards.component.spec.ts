import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipesCardsComponent } from './recipes-cards.component';

describe('RecipesCardsComponent', () => {
	let component: RecipesCardsComponent;
	let fixture: ComponentFixture<RecipesCardsComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [RecipesCardsComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(RecipesCardsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
