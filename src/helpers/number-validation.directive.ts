import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
	selector: '[appNumberValidation]',
})
export class NumberValidationDirective {
	@Input() allowNegativeValue: boolean = true;
	@Input() numberOfDigitsAfterComma?: number = -1;
	@Input() integer? = false;

	constructor(private element: ElementRef) {}

	@HostListener('keydown', ['$event'])
	@HostListener('keyup', ['$event'])
	onImpute(): void {
		const input: HTMLInputElement = this.element.nativeElement;
		const inputValue: string = input.value.replace(',', '.');
		let cursorStartPosition: number = input.selectionStart!;
		const negativeNumber = inputValue[0] === '-';

		const onlyDigitsAndDotsArray: string[] =
			inputValue.match(/([\d\.]+)/g) ?? [];

		const onlyDigits: string[] = onlyDigitsAndDotsArray.filter(s => s !== '.');
		let newValue = onlyDigits[0] ?? '';

		if (onlyDigits.length > 1) {
			const lastElement = onlyDigits.pop();
			newValue = onlyDigits.join('') + '.' + lastElement;
		}

		if (this.integer) {
			newValue = newValue.replace('.', '');
		}
		if (negativeNumber && this.allowNegativeValue) newValue = `-${newValue}`;
		if (newValue === '-0') newValue = '0';

		if (this.numberOfDigitsAfterComma !== -1) {
			const regexString = `^(-?\\d*[\.]?)(\\d{0,${this.numberOfDigitsAfterComma}})(\\d)?`;
			const regex = new RegExp(regexString);
			const result = newValue.match(regex)!;

			newValue = (
				result[1] + (Number(result[3]) >= 5 ? Number(result[2]) + 1 : result[2])
			).trim();
		}

		// if (!!onlyDigits.length && onlyDigits[0].length > 3) {
		// 	const numbersBeforeComa = onlyDigits[0];
		// 	newValue =
		// 		numbersBeforeComa.slice(0, cursorStartPosition - 1) +
		// 		numbersBeforeComa.slice(cursorStartPosition); +
		// 	cursorStartPosition -= 1;
		// }

		input.value = newValue;
		input.dispatchEvent(
			new InputEvent('input', {
				bubbles: true,
				cancelable: false,
			})
		);
		input.setSelectionRange(cursorStartPosition, cursorStartPosition);
	}

	@HostListener('change', ['$event'])
	onChange(): void {
		const input: HTMLInputElement = this.element.nativeElement;
		const inputValue: string = input.value;
		const cursorStartPosition: number = input.selectionStart!;
		const newValue = [',', '.'].includes(inputValue[inputValue.length - 1])
			? inputValue.slice(0, -1)
			: inputValue;
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
