import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserQuery } from './admin/current-user/user-query';
import { routeDefinitions } from './routing-definitions';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

	constructor(private userQuery: UserQuery) {

	}

    canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
		const path = route.routeConfig?.path;
		if (path === routeDefinitions.ADMIN) {
			return !!this.userQuery.getCurrentUser();
		}

		return true;
    }
	
}
