import { Component } from '@angular/core';
import Constants from 'src/app/constants';

@Component({
	selector: 'app-not-found-page',
	templateUrl: './not-found-page.component.html',
	styleUrls: ['./not-found-page.component.scss'],
})
export class NotFoundPageComponent {
	public images = Constants.assets.images;
	constructor() {}
}
