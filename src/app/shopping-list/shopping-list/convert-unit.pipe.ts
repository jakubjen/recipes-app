import { Pipe, PipeTransform } from '@angular/core';

type Value = {
	amount: string;
	unit: string;
};

@Pipe({
	name: 'convertUnit',
})
export class ConvertUnitPipe implements PipeTransform {
	transform({ amount: amountArg, unit }: Value): string {
		let amount = Number(amountArg);
		if (unit === 'grams') {
			if (amount > 1000) {
				amount = amount / 1000;
				unit = 'kilograms';
			}
		}
		if (unit === 'milliliters') {
			if (amount > 1000) {
				amount = amount / 1000;
				unit = 'liters';
			}
		}
		return `${amount} ${unit}`;
	}
}
