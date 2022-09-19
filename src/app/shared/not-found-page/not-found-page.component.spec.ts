import { ComponentFixture, TestBed } from '@angular/core/testing';
import Constants from 'src/app/constants';
import { TranslateMock } from 'src/mock/translate.mock.pipe';
import { NotFoundPageComponent } from './not-found-page.component';

describe('NotFoundPageComponent', () => {
	let component: NotFoundPageComponent;
	let fixture: ComponentFixture<NotFoundPageComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [NotFoundPageComponent, TranslateMock],
		}).compileComponents();

		fixture = TestBed.createComponent(NotFoundPageComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should have 404 image', () => {
		const imageTag = fixture.nativeElement.querySelector('img');
		expect(imageTag.src).toContain(Constants.assets.images.image404);
	});

	it('should have h3 element', () => {
		const imageTag = fixture.nativeElement.querySelector('h3');
		expect(imageTag.innerText).toBe('App.PageNotFound.Heading');
	});
});
