import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login';
import { CoursesComponent } from './pages/courses';
import { DataResolver } from './app.resolver';


export const ROUTES: Routes = [
  { path: '',   component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'courses', component: CoursesComponent },
];
