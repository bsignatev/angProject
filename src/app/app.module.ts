import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { removeNgStyles, createNewHosts, createInputTransfer } from '@angularclass/hmr';

import { ROUTES } from './app.routes';
import { AppComponent } from './app.component';
import { InternalStateType } from './app.service';
import { LoginComponent } from './pages/login';
import { CoursesComponent } from './pages/courses';
import { CourseEditComponent } from './pages/courseEdit';
import { LoginService, ApiService, CoursesService, NotificationService, LoadingService,BreadcrumbsService} from './services';
import { HeaderComponent } from './components/header';
import {NotificationComponent} from './components/notification';
import {LoadingIndicator} from './components/loading';
import {BreadcrumbsComponent} from './components/breadcrumbs';
import {CoursesListComponent} from './components';

import {OnlyDateDirective} from './directives/';

import {NumToTime} from './pipes/numToTime';

import { LoggedInGuard } from './guards/loggedIn.guard';




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
    CourseEditComponent,
    HeaderComponent,
    NumToTime,
    NotificationComponent,
    LoadingIndicator,
    OnlyDateDirective,
    BreadcrumbsComponent,
    CoursesListComponent
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
    NotificationComponent,
    NotificationService,
    LoadingService,
    LoggedInGuard,
    BreadcrumbsService
  ]

})
export class AppModule {
  constructor(public appRef: ApplicationRef) { }

}

