import { CanDeactivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

export interface ComponentCanDeactivate {
	canDeactivate: () => boolean | Observable<boolean>;
}

@Injectable()
export class PendingChangesGuard
	implements CanDeactivate<ComponentCanDeactivate>
{
	constructor(private translate: TranslateService) {}
	canDeactivate(
		component: ComponentCanDeactivate
	): boolean | Observable<boolean> {
		return component.canDeactivate()
			? true
			: confirm(this.translate.instant('App.UnsavedChanges'));
	}
}
