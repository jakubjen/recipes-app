import {
	animate,
	state,
	style,
	transition,
	trigger,
} from '@angular/animations';
import { AfterViewInit, Component, HostListener, OnInit } from '@angular/core';
import { fromEvent, debounce, interval, throttle } from 'rxjs';

@Component({
	selector: 'app-scroll-to-top',
	templateUrl: './scroll-to-top.component.html',
	styleUrls: ['./scroll-to-top.component.scss'],
	animations: [
		trigger('openClose', [
			state('open', style({ opacity: 1 })),
			state(
				'closed',
				style({
					height: 0,
					opacity: 0,
				})
			),
			transition('open => closed', [animate('0.3s ease-out')]),
			transition('closed => open', [animate('0.3s ease-out')]),
		]),
	],
})
export class ScrollToTopComponent {
	public showButton: boolean = false;

	@HostListener('window:scroll', ['$event'])
	private handleScroll() {
		this.showButton = window.scrollY > window.visualViewport.height * 0.5;
	}

	public scrollToTop() {
		window.scrollTo(0, 0);
	}
}
