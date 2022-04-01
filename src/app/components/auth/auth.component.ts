import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
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

  emailFormControl = new FormControl('', [Validators.required, Validators.email]);

  public showPassword: boolean = false;

  isLoading = false;

  matcher = new MyErrorStateMatcher();
  constructor(private router: Router, private authService : AuthService) {}

  ngOnInit(): void {}

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  goToHomePage() {
    this.router.navigateByUrl('/dhr/home');
  }


  onLogin(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.authService.postLogin(form.value.email, form.value.password);
  }

}
