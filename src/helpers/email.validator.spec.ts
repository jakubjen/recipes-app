import { FormControl } from '@angular/forms';
import { customEmailValidator } from './email.validator';

const validator = customEmailValidator();

const validData = [
	'kuba@kuba.com',
	'fbuef@id.pl',
	'fbuef@id.eu',
	'edu.edu.@edu.edu',
];

const incorrect = ['kuba@kuba', 'kuba@cos.', 'albert.pl', 'fbuef@id.eu&^'];

describe('customEmailValidator', () => {
	it('should return null when adres is correct', () => {
		validData.forEach(email => {
			const formControl = new FormControl(email);
			expect(validator(formControl)).toBeNull();
		});
	});
	it('should return error when adres is correct', () => {
		incorrect.forEach(email => {
			const formControl = new FormControl(email);
			expect(validator(formControl)).toEqual({ email: true });
		});
	});
});
