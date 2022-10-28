import { ActivatedRouteSnapshot } from '@angular/router';
import { map } from 'rxjs';

export const redirectUnauthorizedToLogin = (next: ActivatedRouteSnapshot) =>
	map((user: Object | null) => {
		const originUrl = next.routeConfig?.path
			? `?originUrl=${encodeURI(next.routeConfig.path)}`
			: '';
		return user ? true : `/auth/login${originUrl}`;
	});
