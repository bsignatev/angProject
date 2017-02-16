import { Component, ViewEncapsulation } from '@angular/core';
import { AppState } from './app.service';
import { LoginService } from '../../services';

@Component({
  selector: 'page-header',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    './header.component.css'
  ],
  templateUrl: './header.component.html'

})
export class HeaderComponent {

  login: string = "";

  constructor(private loginService: LoginService)
  { }

  ngOnInit() {
    let lobject = JSON.parse(window.localStorage.getItem("login"));
    if (lobject) {
      this.login = lobject.login;
    }
  }

  logOut() {
    this.loginService.logOff();
  }
}