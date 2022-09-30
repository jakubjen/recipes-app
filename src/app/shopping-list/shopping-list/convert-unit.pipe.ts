import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { from, observable, Observable, Subject } from 'rxjs';
import { convertUnit } from 'src/helpers/convertUnits';

type Value = {
	amount: string;
	unit: string;
};

@Pipe({
	name: 'convertUnit',
})
export class ConvertUnitPipe implements PipeTransform {
	constructor(private translate: TranslateService) {}
	transform({ amount, unit }: Value): Observable<string> {
		const observable = new Observable<string>(observer => {
			observer.next(
				`${convertedUnits.amount} ${this.translate.instant(
					'Units.' + convertedUnits.unit
				)}`
			);
			this.translate.onLangChange.subscribe(() => {
				observer.next(
					`${convertedUnits.amount} ${this.translate.instant(
						'Units.' + convertedUnits.unit
					)}`
				);
			});
		});
		const convertedUnits = convertUnit({ amount, unit });
		return observable;
	}
}
