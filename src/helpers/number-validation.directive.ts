import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
	selector: '[appNumberValidation]',
})
export class NumberValidationDirective {
	@Input() allowNegativeValue: boolean = true;
	@Input() numberOfDigitsAfterComma?: number;

	constructor(private element: ElementRef) {}

	@HostListener('keyup', ['$event'])
	onImpute() {
		const value: string = this.element.nativeElement.value;
		const negativeNumber = value[0] === '-';

		const onlyDigitsAndComasAndDotsArray: string[] =
			value.match(/([\d,\.]+)/g) ?? [];
		console.table(onlyDigitsAndComasAndDotsArray);
		const onlyDigitsAndComasAndDots = onlyDigitsAndComasAndDotsArray.join('');

		const onlyDigits: string[] = onlyDigitsAndComasAndDots.split(/[,\.]/);
		let newValue = onlyDigits[0] ?? '';

		if (onlyDigits.length > 1) {
			const lastElement = onlyDigits.pop();
			newValue = onlyDigits.join('') + ',' + lastElement;
		}

		if (negativeNumber && this.allowNegativeValue) newValue = `-${newValue}`;
		if (newValue === '-0') newValue = '0';
		if (!!this.numberOfDigitsAfterComma) {
			const regexString = `^-?\\d*[.,]?(\\d{0,${this.numberOfDigitsAfterComma}})`;
			const regex = new RegExp(regexString);

			newValue = newValue.match(/^-?\d*[.,]?(\d{0,2})/)?.[0] ?? '';
		}

		this.element.nativeElement.value = newValue;
		this.element.nativeElement.dispatchEvent(
			new InputEvent('input', {
				bubbles: true,
				cancelable: false,
			})
		);

		if (isNaN(Number(value[0])))
			this.element.nativeElement.setSelectionRange(0, 0);

		if (negativeNumber && !this.allowNegativeValue)
			this.element.nativeElement.setSelectionRange(0, 0);
		if (onlyDigitsAndComasAndDotsArray.length > 1) {
			const invalidCharPosition = onlyDigitsAndComasAndDotsArray[0].length;
			this.element.nativeElement.setSelectionRange(
				invalidCharPosition,
				invalidCharPosition
			);
		}
	}
}
