import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from "@angular/router";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from "src/app/services/auth.service";
import { AuthComponent } from "../auth.component";


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authComponent: AuthComponent, private router: Router) {}
  private isAuth :boolean = false
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    console.log("estoy aca 1")
    const isAuth = this.authComponent.getIsAuth();
    if (!isAuth) {
      console.log(isAuth);
      // DESCOMENTAR
      this.router.navigate(['']);
    }
    return isAuth;
  }
}
