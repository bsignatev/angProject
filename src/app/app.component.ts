import { Component, ViewEncapsulation } from '@angular/core';
import { AppState } from './app.service';
import { LoginService } from './services';

@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    './app.component.css'
  ],
  templateUrl: './app.component.html'

})
export class AppComponent {

  constructor() {}

}

