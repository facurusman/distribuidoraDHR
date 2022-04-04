import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth.service';


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  emailFormControl = new FormControl('', [Validators.required, Validators.email]);

  public showPassword: boolean = false;

  isLoading = false;
  durationInSeconds = 5;

  matcher = new MyErrorStateMatcher();
  constructor(private router: Router, private authService : AuthService, private _snackBar: MatSnackBar) {}

  ngOnInit(): void {}

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
  // openSnackBar() {
  //   this._snackBar.openFromComponent(PizzaPartyComponent, {
  //     duration: this.durationInSeconds * 1000,
  //   });
  // }

  onLogin(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    this.authService.postLogin(form.value.email, form.value.password);
  }

}


