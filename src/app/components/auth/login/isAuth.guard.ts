import {
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    Router
} from "@angular/router";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from "src/app/services/auth.service";


@Injectable({
    providedIn: 'root'
})

export class IsAuthGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) { }
    private isAuth: boolean = false


    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): boolean {
        const isAuth = this.authService.getIsAuth();
        if (!isAuth) return true;
        const url = isAuth ? '/dyg/sales' : '';
        this.router.navigate([url])
        return true

    }
}
