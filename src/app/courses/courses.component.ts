import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AppState } from '../app.service';
import { CoursesService } from '../services'
import { Course } from '../entities'


@Component({
  selector: 'courses',
  providers: [],
  styleUrls: ['./courses.component.css'],
  templateUrl: './courses.component.html'
})
export class CoursesComponent {
  courses: Course[]

  constructor(
    private coursesService: CoursesService
  )
  { }

  ngOnInit() {
    this.getCourses();
  }
  getCourses() {

    this.coursesService.getCourses().subscribe(courses => {
      this.courses = courses;
    });

  }
}
