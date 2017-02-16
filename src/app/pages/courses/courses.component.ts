import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AppState } from '../app.service';
import { CoursesService, BreadcrumbsService } from '../../services'
import { Course } from '../../entities'
import { Router, ActivatedRoute } from '@angular/router';

import { AppActions } from './../../app.actions';
import { coursesReducer, authorsReducer } from '../reducers';
import { Store } from '@ngrx/store';
import { PageComponent } from '../page.component';


@Component({
  selector: 'courses',
  providers: [],
  styleUrls: ['./courses.component.css'],
  templateUrl: './courses.component.html'
})
export class CoursesComponent extends PageComponent {
  courses: Course[];
  course: Course;
  param: string = '';
  filtredCourses: Course[];

  constructor(
    private coursesService: CoursesService,
    private router: Router,
    private route: ActivatedRoute,
    private breadcrumbsService: BreadcrumbsService,
    private store: Store<any>,
    private appActions: AppActions
  )
  { super(store, { coursesReducer, authorsReducer }); }

  onInit() {
    this.breadcrumbsService.setBreadCrumb(this.route.snapshot.url)
    this._subscription(
      this.store.select(state => state.coursesReducer).subscribe((items: Course[]) => {
        this.courses = items;
        this.filtredCourses = items;
      }));
  }

  editCourse(course: Course) {
    this.router.navigate(['/courses', course.id]);
  }

  addCourse() {
    this.router.navigate(['/courses', 'new']);
  }

  deleteCourse(course: Course) {
    let confirmDialog = confirm("Are you sure you want to delete course - " + course.title + "?");
    if (confirmDialog == true) {
      this.coursesService.deleteCourse(course)
    }
  }

  search(param: string) {
    if (param)
      this.filtredCourses = this.courses.filter(course => course.title.toLowerCase().includes(param.toLowerCase()));
    else this.filtredCourses = this.courses;
  }
}
