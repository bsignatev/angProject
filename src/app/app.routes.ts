import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login';
import { CoursesComponent } from './pages/courses';
import { CourseEditComponent } from './pages/courseEdit';
import { DataResolver } from './app.resolver';


export const ROUTES: Routes = [
  { path: '',   component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'courses', component: CoursesComponent },
  { path: 'courses/:id', component: CourseEditComponent },
  { path: 'courses/new', component: CourseEditComponent }
];
