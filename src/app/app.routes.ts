import { Routes, RouterModule, CanActivate } from '@angular/router';
import { LoginComponent } from './pages/login';
import { CoursesComponent } from './pages/courses';
import { CourseEditComponent } from './pages/courseEdit';
import { DataResolver } from './app.resolver';
import { LoggedInGuard } from './guards/loggedIn.guard';


export const ROUTES: Routes = [
  { path: '',   component: LoginComponent, canActivate: [LoggedInGuard] },
  { path: 'login', component: LoginComponent  },
  { path: 'courses', component: CoursesComponent,canActivate: [LoggedInGuard]  },
  { path: 'courses/:id', component: CourseEditComponent,canActivate: [LoggedInGuard]  },
  { path: 'courses/new', component: CourseEditComponent,canActivate: [LoggedInGuard]  }
];
