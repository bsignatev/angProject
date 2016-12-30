import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { removeNgStyles, createNewHosts, createInputTransfer } from '@angularclass/hmr';

import { ROUTES } from './app.routes';
import { AppComponent } from './app.component';
import { InternalStateType } from './app.service';
import { LoginComponent } from './login';
import { CoursesComponent } from './courses';
import { LoginService, ApiService, CoursesService } from './services';
import { HeaderComponent } from './components/header';
import {NotificationComponent} from './components/notification';

import {NumToTime} from './pipes/numToTime';




type StoreType = {
  state: InternalStateType,
  restoreInputValues: () => void,
  disposeOldHosts: () => void
};

@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
    LoginComponent,
    CoursesComponent,
    HeaderComponent,
    NumToTime,
    NotificationComponent
  ],
  imports: [ // import Angular's modules
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES, { useHash: true, preloadingStrategy: PreloadAllModules })
  ],
  providers: [
    ApiService,
    LoginService,
    CoursesService,
    NotificationComponent
  ]

})
export class AppModule {
  constructor(public appRef: ApplicationRef) { }

}

