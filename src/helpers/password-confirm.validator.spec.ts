import { FormControl, FormGroup } from '@angular/forms';
import { passwordConfirmValidator } from './password-confirm.validator';

const validData = new FormGroup({
	password: new FormControl('njrwvourbvurwbvbuvwobvrbvoubrv'),
	passwordConfirm: new FormControl('njrwvourbvurwbvbuvwobvrbvoubrv'),
});

const incorrect = new FormGroup({
	password: new FormControl('njrwvourbvurwbvbuvwobvrbvoubrv'),
	passwordConfirm: new FormControl('efefewgibwrv'),
});

describe('PasswordConfirmValidator', () => {
	it('should return null when password are equal', () => {
		const validator = passwordConfirmValidator;
		expect(validator(validData)).toBeNull();
	});

	it('should return error when password are not equal', () => {
		const validator = passwordConfirmValidator;
		expect(validator(incorrect)).toEqual({ passwordConfirm: true });
	});
});
