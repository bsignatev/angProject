import { Component, ViewEncapsulation } from '@angular/core';
import { AppState } from './app.service';

@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    './app.component.css'
  ],
  template: `
    <header>
      <div class='container'>
        <h1>Application</h1>
      </div>
    </header>

    <main>
      <router-outlet></router-outlet>
    </main>

    <footer>

    </footer>
  `
})
export class AppComponent {
  

  constructor() {

  }

  ngOnInit() {

  }
}

