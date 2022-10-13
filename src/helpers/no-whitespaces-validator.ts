import { AbstractControl, ValidationErrors } from '@angular/forms';

export const noWhitespaceValidator = () => {
	return (control: AbstractControl): ValidationErrors | null => {
		const provideValue: string = control.value;

		return new RegExp(/^\S*\s?$/).test(provideValue)
		? null: { trimValue: true };
	};
};
