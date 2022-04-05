import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { environment } from 'src/environments/environment';
import { Subject } from "rxjs";
import { Router } from '@angular/router';
import { AuthData } from '../components/auth/auth-data.model';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = false;
  private token: any;
  private tokenTimer: any;
  private authStatusListener = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router) {}



  postLogin(email: string, password: string) {
    const authData: AuthData = { email: email, password: password };
    return this.http.post<{ token: string; expiresIn: number }>(`${environment.apiUsers}/login`, authData)
  }

}
