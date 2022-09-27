import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormGroupDirective } from '@angular/forms';

@Component({
	selector: 'app-form-error',
	template: 'FormError component',
})
export class FormErrorMockComponent {
	@Input() input: AbstractControl | null = null;
	@Input() form: FormGroupDirective | null = null;
}
