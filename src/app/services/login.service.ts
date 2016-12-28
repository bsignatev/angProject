import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';
import { ApiService } from './api.service';

@Injectable()
export class LoginService {
  JWT_KEY: string = 'auth_token';
  LOGIN_KEY = 'login';
  signedOut: boolean = true;

  constructor(
    private api: ApiService,
    private router: Router) {

    const token = window.localStorage.getItem(this.JWT_KEY);
    const userData = JSON.parse(window.localStorage.getItem(this.LOGIN_KEY));
    if (token) {
      this.setJwt(token, userData);
      this.router.navigate(['/courses']);
    }
  }

  setJwt(jwt: string, userData: any) {
    window.localStorage.setItem(this.JWT_KEY, jwt);
    window.localStorage.setItem(this.LOGIN_KEY, JSON.stringify(userData));
    this.api.setHeaders({ Authorization: `JWT ${jwt}` });
    this.signedOut = false;
  }

  isAuthorized(): boolean {
    return !this.signedOut;
  }

  login(login: string, password: string): Observable<any> {
    return this.api.post(`/signin`, { login: login, password: password })
      .do(res => this.setJwt(res.token, res.data))
      .map(res => res.data);
  }

  logOff() {
    window.localStorage.removeItem(this.JWT_KEY);
    window.localStorage.removeItem(this.LOGIN_KEY);
    this.signedOut = true;
    this.router.navigate(['/login']);
  }
}