import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(private router: Router) { }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const userDetails: any = JSON.parse(localStorage.getItem('userDetails'));
        const url = state.url;
        if (!userDetails?.userName) {
            if (url === '/login' || url === '/register') {
                return true;
            } else {
                this.router.navigate(['login']);
                return false;
            }
        } else {
            if (!userDetails.isAdmin) {
                // only admin user can access this url
                if (url.includes('create') || url.includes('edit')) {
                    this.router.navigate(['post', 'index']);
                    return false;
                } else if (url === '/login' || url === '/register') {
                    this.router.navigate(['post', 'index']);
                    return false;
                } else {
                    return true;
                }
            } else if (url === '/login' || url === '/register') {
                this.router.navigate(['post', 'index']);
                return false;
            } else {
                return true;
            }
        }
    }
}