import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { routeDefinitions } from './routing-definitions';
import { SubscriptionLike } from 'rxjs';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
	shouldShowPageHeader = true;
	private eventSub: SubscriptionLike;
	
	constructor(private router: Router) { }

	ngOnInit(): void {
		this.eventSub = this.router.events.subscribe(event => {
			if (event instanceof NavigationEnd) {
				const url = event.url;
				this.shouldShowPageHeader = !url.includes(routeDefinitions.ADMIN) && !url.includes(routeDefinitions.LOGIN);
			}
		});	
	}

	ngOnDestroy(): void {
		this.eventSub.unsubscribe();
	}
}
