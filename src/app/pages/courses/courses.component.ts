import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AppState } from '../app.service';
import { CoursesService } from '../../services'
import { Course } from '../../entities'
import { Router } from '@angular/router';


@Component({
  selector: 'courses',
  providers: [],
  styleUrls: ['./courses.component.css'],
  templateUrl: './courses.component.html'
})
export class CoursesComponent {
  courses: Course[];
  course: Course;
  param: string = '';
  filtredCourses: Course[];

  constructor(
    private coursesService: CoursesService,
    private router: Router
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

  editCourse(course: Course) {
    this.router.navigate(['/courses', course.id]);
  }

  addCourse() {
    this.router.navigate(['/courses', 'new']);
  }

  deleteCourse(course: Course) {
    let confirmDialog = confirm("Are you sure you want to delete course - " + course.title + "?");
    if (confirmDialog == true) {
      this.coursesService.deleteCourse(course.id).subscribe(
        course => {
          this.getCourses();
        });
    }
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
