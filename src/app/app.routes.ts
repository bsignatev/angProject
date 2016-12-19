import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login';
import { CoursesComponent } from './courses';
import { DataResolver } from './app.resolver';


export const ROUTES: Routes = [
  { path: '',   component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'courses', component: CoursesComponent },
];
