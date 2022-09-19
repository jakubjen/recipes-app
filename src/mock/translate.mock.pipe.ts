import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'translate' })
export class TranslateMock implements PipeTransform {
	transform(value: string): string {
		return value;
	}
}
