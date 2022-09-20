import { Pipe, PipeTransform } from '@angular/core';
import { convertUnit } from 'src/helpers/convertUnits';

type Value = {
	amount: string;
	unit: string;
};

@Pipe({
	name: 'convertUnit',
})
export class ConvertUnitPipe implements PipeTransform {
	transform({ amount, unit }: Value): string {
		const convertedUnits = convertUnit({amount, unit})
		return `${convertedUnits.amount} ${convertedUnits.unit}`;
	}
}
