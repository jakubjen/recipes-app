import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const passwordConfirmValidator: ValidatorFn = (
	controls: AbstractControl
): ValidationErrors | null => {
	const password = controls.get('password')?.value;
	const passwordConfirm = controls.get('passwordConfirm')?.value;
	console.log(password, '===', passwordConfirm);

	return password === passwordConfirm
		? null
		: {
				passwordConfirm: true,
		  };
};
