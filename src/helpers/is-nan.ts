import { AbstractControl, ValidationErrors } from '@angular/forms';

export const isNotANumber = () => {
	return (control: AbstractControl): ValidationErrors | null => {
		const number: string = control.value;
		const regExp = new RegExp(/^\d*([,\.]\d+)?$/);
		return regExp.test(number) || number === null ? null : { isNaN: true };
	};
};
