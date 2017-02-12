import { Component, EventEmitter } from '@angular/core';
import { Course } from '../../entities'


@Component({
    selector: 'courses-list',
    templateUrl: './courses-list.component.html',
    inputs: ['courses'],
    outputs: ['onEditCourse', 'onDeleteCourse']
})

export class CoursesListComponent {
    private courses: Course[];
    private onEditCourse: EventEmitter<Course> = new EventEmitter<Course>();
    private onDeleteCourse: EventEmitter<Course> = new EventEmitter<Course>();

    editCourse(course: Course) {
        this.onEditCourse.emit(course);
    }

    deleteCourse(course: Course) {
        this.onDeleteCourse.emit(course);
    }

    isEmptyList() {
    if (this.courses) {
      return !(this.courses.length > 0);
    }
    else return true;
  }

}