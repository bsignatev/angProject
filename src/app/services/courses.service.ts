import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';
import { ApiService } from './api.service';
import { Course } from '../entities'

@Injectable()
export class CoursesService {

  constructor(
    private api: ApiService,
    private router: Router) {
  }

  getCourses(): Observable<Course[]> {
    return this.api.get(`/course`)
      .map(res => res.items as Course[]);
  }

  deleteCourse(id) {
    return this.api.delete(`/course?id=${id}`).do(() => { });
  }
}