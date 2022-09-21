import {
	Directive,
	ElementRef,
	EventEmitter,
	HostListener,
	Output,
} from '@angular/core';

@Directive({
	selector: '[appClickOutSideDirective]',
})
export class ClickOutSideDirective {
	@Output() clickOutSide: EventEmitter<MouseEvent> = new EventEmitter();

	@HostListener('document:mousedown', ['$event'])
	onClick(event: MouseEvent): void {
		if (
			!this.elementRef.nativeElement.contains(event.target) &&
			this.elementRef.nativeElement !== event.target
		) {
			this.clickOutSide.emit(event);
		}
	}

	constructor(private elementRef: ElementRef) {}
}
