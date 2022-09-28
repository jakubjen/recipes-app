import { TestBed } from '@angular/core/testing';
import { AngularFireAuth } from '@angular/fire/compat/auth';

import { AuthService } from './auth.service';

const user = {
	email: 'user@example.com',
	password: 'password',
};

describe('AuthService', () => {
	let service: AuthService;
	let mockFirebase = {
		createUserWithEmailAndPassword: jasmine.createSpy(),
		signInWithEmailAndPassword: jasmine.createSpy(),
		signInWithPopup: jasmine.createSpy(),
		signOut: jasmine.createSpy(),
	};

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				AuthService,
				{ provide: AngularFireAuth, useValue: mockFirebase },
			],
		});
		service = TestBed.inject(AuthService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	it('should register user', () => {
		service.registerUser(user.email, user.password);
		expect(mockFirebase.createUserWithEmailAndPassword).toHaveBeenCalledWith(
			user.email,
			user.password
		);
	});

	it('should login with password', () => {
		service.loginWithPassword(user.email, user.password);
		expect(mockFirebase.signInWithEmailAndPassword).toHaveBeenCalledWith(
			user.email,
			user.password
		);
	});

	it('should login with google', () => {
		service.loginWithGoogle();
		expect(mockFirebase.signInWithPopup).toHaveBeenCalled();
	});

	it('should log out', () => {
		service.logOut();
		expect(mockFirebase.signOut).toHaveBeenCalled();
	});
});
