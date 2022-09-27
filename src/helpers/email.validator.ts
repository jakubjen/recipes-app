import { AbstractControl, ValidationErrors } from '@angular/forms';

export const customEmailValidator = () => {
	return (control: AbstractControl): ValidationErrors | null => {
		const provideEmail = control.value;
		const regExp = new RegExp(
			/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-]+$/
		);

		return regExp.test(provideEmail) ? null : { email: true };
	};
};
