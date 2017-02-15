import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import 'rxjs/add/operator/map';

import { ApiService } from './api.service';
import { Course } from '../entities'
import { AppActions } from '../app.actions';

@Injectable()
export class CoursesService {

  constructor(
    private api: ApiService,
    private appActions: AppActions
  ) {
    this.getCourses();
  }

  getCourses() {
    return this.api.get(`/course`)
      .map(res => res.items as Course[]).subscribe(res => {
        this.appActions.dispatch(AppActions.COURSES_LOADED, res);
      });
  }

  getCourse(id: string): Observable<Course> {
    return Observable.create((observer: Observer<Course>) => {

      //this.getCourses().subscribe(courses => {
      //  let res = courses.find(course => course.id === id)
      //  res = courses.find(course => course.id === id)
      //  observer.next(res);
      //  observer.complete();
      // });

    });
  }

  getCourseFromStore(id: string) {
    let course;
    if (id === 'new') {
      let course = new Course();
    } else {
      let state = this.appActions.getState();
      let index = state.coursesReducer.findIndex(x => x.id == id);
      if (index >= 0) {
        course = state.coursesReducer[index] as Course;
      }
    }
    this.appActions.dispatch(AppActions.COURSE_LOADED, course);
  }

  deleteCourse(course: Course) {
    return this.api.delete(`/course?id=${course.id}`).subscribe(res => {
      this.appActions.dispatch(AppActions.DELETE_COURSE, course);
    });
  }

  addCourse(course: Course) {
    return this.api.post('/course', course)
      .map(res => res as Course).subscribe(res => {
        this.appActions.dispatch(AppActions.ADD_COURSE, res);
      });
  }

  updateCourse(course: Course) {
    return this.api.put('/course', course)
      .map(res => res as Course).subscribe(res => {
        this.appActions.dispatch(AppActions.UPDATE_COURSE, res);
      });
  }
}


