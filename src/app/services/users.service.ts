import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UsersService implements OnDestroy {
  private _authSub$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  public get isAuthenticated$(): Observable<boolean> {
    return this._authSub$.asObservable();
  }

  constructor(private _router: Router, private readonly http: HttpClient) { }

  public ngOnDestroy(): void {
    this._authSub$.next(false);
    this._authSub$.complete();
  }
  getUsers() {
    return this.http.get(`${environment.apiUsers}/`);
  }

  getUser(id: any) {
    return this.http.get(`${environment.apiUsers}/${id}`);
  }

  postUser(user:User) {
    return this.http.post(`${environment.apiUsers}/signup`, {user});
  }

  editUser(id: any, email:string, rol:number) {
    return this.http.put(`${environment.apiUsers}/${id}`, {email,rol})
  }

  deleteUser(id: number) {
    return this.http.delete(`${environment.apiUsers}/${id}`)
  }
}
