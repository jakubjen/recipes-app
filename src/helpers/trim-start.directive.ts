import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
	selector: '[appTrim]',
})
export class TrimDirective {
	constructor(private element: ElementRef) {}

	@HostListener('change', ['$event'])
	onImpute(): void {
		const input: HTMLInputElement = this.element.nativeElement;

		const inputValue: string = input.value;

		const cursorStartPosition: number = input.selectionStart!;
		const newValue = inputValue.trim();

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
