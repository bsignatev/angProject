import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {LoginService} from '../services';


@Injectable()
export class LoggedInGuard implements CanActivate {
  constructor(private loginService:LoginService,
              private router:Router) {
  }

  canActivate():boolean {
    var isLoggedIn = this.loginService.isAuthorized();
    if (!isLoggedIn) {
      this.router.navigate(['/login']);
    }
    return isLoggedIn;
  }
}