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
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
  private isAuth :boolean = false
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    console.log("11111111111")
    const isAuth = this.authService.getIsAuth();
    if (!isAuth) {
      console.log("222222222222")
      this.router.navigate(['']);
    }
    console.log("33333333")
    return isAuth;
  }
}
