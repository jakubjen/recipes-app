import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
	selector: '[appNumberValidation]',
})
export class NumberValidationDirective {
	@Input() allowNegativeValue: boolean = true;
	@Input() numberOfDigitsAfterComma?: number;

	constructor(private element: ElementRef) {}

	@HostListener('keyup', ['$event'])
	onImpute(event: Event): void {
		const input: HTMLInputElement = this.element.nativeElement;
		const inputValue: string = input.value;

		const cursorStartPosition: number = input.selectionStart!;
		const negativeNumber = inputValue[0] === '-';

		const onlyDigitsAndComasAndDotsArray: string[] =
			inputValue.match(/([\d,\.]+)/g) ?? [];

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
			newValue = newValue.match(regex)?.[0] ?? '';
		}

		input.value = newValue;
		input.dispatchEvent(
			new InputEvent('input', {
				bubbles: true,
				cancelable: false,
			})
		);
		input.setSelectionRange(cursorStartPosition, cursorStartPosition);
	}
}
