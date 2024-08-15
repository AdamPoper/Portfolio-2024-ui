import { Component, OnDestroy } from '@angular/core';
import { LoginStoreService } from './login.store.service';
import { SubscriptionLike } from 'rxjs';
import { Router } from '@angular/router';
import { routeDefinitions } from 'src/app/routing-definitions';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnDestroy {
	username: string;
	password: string;

	private loginSub: SubscriptionLike;

	constructor(private loginStoreService: LoginStoreService,
				private router: Router
	) { }

	public onLogin(): void {
		if (this.username && this.password) {
			this.loginSub = this.loginStoreService.login(this.username, this.password)
				.subscribe({
					next: (user) => {
						if (user) {
							this.router.navigate([routeDefinitions.ADMIN]);
						}
					},
					error: (e) => alert(e.error)
				});
		}
	}

	ngOnDestroy(): void {
		this.loginSub.unsubscribe();
	}
}
