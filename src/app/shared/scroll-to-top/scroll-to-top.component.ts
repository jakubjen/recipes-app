import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-scroll-to-top',
	templateUrl: './scroll-to-top.component.html',
	styleUrls: ['./scroll-to-top.component.scss'],
})
export class ScrollToTopComponent {
	public scrollToTop() {
		window.scrollTo(0, 0);
	}
}
