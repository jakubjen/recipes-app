import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import userActions from '@store/auth/user.actions';
import { FormErrorMockComponent } from 'src/mock/form-error.component.mock';
import mockStore from 'src/mock/store.mock';
import { TranslateMock } from 'src/mock/translate.mock.pipe';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
	let component: LoginComponent;
	let fixture: ComponentFixture<LoginComponent>;
	let emailInput: HTMLInputElement;
	let passwordInput: HTMLInputElement;
	let formHtmlElement: HTMLFormElement;
	let loginWithGoogleButon: HTMLButtonElement;
	let form: FormGroup<{
		email: FormControl<string | null>;
		password: FormControl<string | null>;
	}>;
	const providedMockStore = mockStore;
	const correctData = {
		email: 'user@example.com',
		password: 'LongPasswordLongPasswordLongPasswordLongPasswordLongPassword',
	};

	const incorrectData = [
		{
			email: 'user@ex.',
			password: 'LongPasswordLongPasswordLongPasswordLongPasswordLongPassword',
		},
		{
			email: 'user@example',
			password: 'LongPasswordLongPasswordLongPasswordLongPasswordLongPassword',
		},
		{
			email: '@example.com',
			password: 'LongPasswordLongPasswordLongPasswordLongPasswordLongPassword',
		},
		{
			email: 'user@example.com',
			password: 'toShort',
		},
	];

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [LoginComponent, TranslateMock, FormErrorMockComponent],
			imports: [ReactiveFormsModule],
			providers: [{ provide: Store, useValue: providedMockStore }],
		}).compileComponents();

		fixture = TestBed.createComponent(LoginComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
		emailInput = fixture.debugElement.query(
			By.css('input[type=email]')
		).nativeElement;
		passwordInput = fixture.debugElement.query(
			By.css('input[type=password]')
		).nativeElement;
		form = component.loginForm;

		formHtmlElement = fixture.debugElement.query(By.css('form')).nativeElement;
		loginWithGoogleButon = fixture.debugElement.query(
			By.css('.login-with-google')
		).nativeElement;
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should validate user input', () => {
		emailInput.value = correctData.email;
		emailInput.dispatchEvent(new Event('input'));
		passwordInput.value = correctData.password;
		passwordInput.dispatchEvent(new Event('input'));
		expect(form.valid).toBeTrue();

		incorrectData.forEach(data => {
			emailInput.value = data.email;
			emailInput.dispatchEvent(new Event('input'));
			passwordInput.value = data.password;
			passwordInput.dispatchEvent(new Event('input'));
		});
	});
	it('should dispatch action on submit when data are correct', () => {
		emailInput.value = correctData.email;
		emailInput.dispatchEvent(new Event('input'));
		passwordInput.value = correctData.password;
		passwordInput.dispatchEvent(new Event('input'));
		formHtmlElement.dispatchEvent(new Event('submit'));
		expect(form.valid).toBeTrue();
		expect(providedMockStore.dispatch).toHaveBeenCalledWith(
			userActions.loginWithPassword({
				email: correctData.email,
				password: correctData.password,
			})
		);
	});

	it("shouldn't dispatch action on submit when data are incorrect", () => {
		emailInput.value = incorrectData[0].email;
		emailInput.dispatchEvent(new Event('input'));
		passwordInput.value = incorrectData[0].password;
		passwordInput.dispatchEvent(new Event('input'));
		formHtmlElement.dispatchEvent(new Event('submit'));
		expect(form.valid).toBeFalse();
		expect(providedMockStore.dispatch).not.toHaveBeenCalledWith(
			userActions.loginWithPassword({
				email: correctData.email,
				password: correctData.password,
			})
		);
	});

	it('should dispatch loginWithGoogle when user click login with google', () => {
		spyOn(component, 'loginWithGoogle');

		loginWithGoogleButon.dispatchEvent(new Event('click'));
		fixture.detectChanges();
		expect(component.loginWithGoogle).toHaveBeenCalledTimes(1);
	});
});
