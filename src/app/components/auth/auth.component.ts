import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: UntypedFormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-auth',
  templateUrl: './login/login.component.html',
  styleUrls: ['./login/login.component.scss']
})

export class AuthComponent implements OnInit {
  emailFormControl = new UntypedFormControl('', [Validators.required, Validators.email]);
  public showPassword: boolean = false;
  isLoading = false;
  private isAuthenticated = false;
  private token: any;
  private rol: any;
  private tokenTimer: any;
  error: boolean = true
  private authStatusListener = new Subject<boolean>();
  matcher = new MyErrorStateMatcher();
  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.error = false
    this.autoAuthUser();
  }

  getToken() {
    return this.token;
  }

  getRol() {
    return this.rol;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  goToHomePage() {
    this.router.navigateByUrl('/dyg/sales');
  }

  getIsAuth() {
    if (this.isAuthenticated) {
      this.error = false
    } else {
      this.error = true
    }
    return this.isAuthenticated;
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.rol = authInformation.rol
      this.isAuthenticated = true;
      this.error = false
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
  }

  logout() {
    this.token = null;
    this.rol = null
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate([""]);
  }

  private setAuthTimer(duration: number) {
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  private saveAuthData(token: string, expirationDate: Date, rol: string) {
    localStorage.setItem("token", token);
    localStorage.setItem("expiration", expirationDate.toISOString());
    localStorage.setItem("rol", rol);
  }

  private clearAuthData() {
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
    localStorage.removeItem("rol");
  }

  private getAuthData() {
    const token = localStorage.getItem("token");
    const expirationDate = localStorage.getItem("expiration");
    const rol = localStorage.getItem("rol");
    if (!token || !expirationDate || !rol) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate),
      rol: rol
    }
  }

  onLogin(form: NgForm) {
    this.authService.postLogin(form.value.email, form.value.password)
    if (this.isAuthenticated == false || this.error == true) {
      this.error = true;
    } else {
      this.error = false;
    }
  }
}

