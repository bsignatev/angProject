import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AppState } from '../app.service';
import { CoursesService } from '../../services'
import { Course } from '../../entities'


@Component({
  selector: 'courses',
  providers: [],
  styleUrls: ['./courses.component.css'],
  templateUrl: './courses.component.html'
})
export class CoursesComponent {
  courses: Course[];
  param: string = '';
  filtredCourses: Course[];

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
      this.filtredCourses = courses;
    });
  }

  deleteCourse(course: Course) {
  
 }

  search(param: string) {
    if (param)
      this.filtredCourses = this.courses.filter(course => course.title.toLowerCase().includes(param.toLowerCase()));
    else this.filtredCourses = this.courses;
  }

  isEmptyList() {
    if (this.filtredCourses) {
      return !(this.filtredCourses.length > 0);
    }
    else return true;
  }

}
