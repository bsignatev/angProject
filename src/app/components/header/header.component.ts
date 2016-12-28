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

  constructor(private loginService: LoginService)
  { }

  logOut() {
    this.loginService.logOff();
  }
}