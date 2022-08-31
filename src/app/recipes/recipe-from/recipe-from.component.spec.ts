import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeFromComponent } from './recipe-from.component';

describe('RecipeFromComponent', () => {
	let component: RecipeFromComponent;
	let fixture: ComponentFixture<RecipeFromComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [RecipeFromComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(RecipeFromComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
