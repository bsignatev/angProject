import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import 'rxjs/add/operator/map';

import { ApiService } from './api.service';
import { Course } from '../entities'

@Injectable()
export class CoursesService {

  constructor(
    private api: ApiService
    ) {
  }

  getCourses(): Observable<Course[]> {
    return this.api.get(`/course`)
      .map(res => res.items as Course[]);
  }

  getCourse(id: string): Observable<Course> {
    return Observable.create((observer: Observer<Course>) => {

      this.getCourses().subscribe(courses => {
        let res = courses.find(course => course.id === id)
        res = courses.find(course => course.id === id)
        observer.next(res);
        observer.complete();
      });

    });
  }

  deleteCourse(id) {
    return this.api.delete(`/course?id=${id}`).do(() => { });
  }

  addCourse(course: any) {
    return this.api.post('/course', course)
      .do(course => { });
  }

  updateCourse(course: any) {
    return this.api.put('/course', course)
      .do(course => { })
  }
}


