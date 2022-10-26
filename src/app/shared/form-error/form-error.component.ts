import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormGroupDirective } from '@angular/forms';

@Component({
	selector: 'app-form-error',
	templateUrl: './form-error.component.html',
	styleUrls: ['./form-error.component.scss'],
})
export class FormErrorComponent {
	@Input() input: AbstractControl | null = null;
	@Input() form: FormGroupDirective | null = null;
	@Input() requiredTouch = true;
	@Input() requiredSubmit = true;
}
