
import { Course } from '../../entities';
import { CourseEditComponent } from './courseEdit.component';
import { CoursesService, AuthorsService, NotificationService, BreadcrumbsService } from '../../services';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

xdescribe('CourseEdit component', () => {
    let fakeCoursesService: CoursesService;
    let coursesEditComponent: CourseEditComponent;
    let route: ActivatedRoute;
    let router: Router;
    let formBuilder: FormBuilder;
    let authorsService: AuthorsService;
    let notification: NotificationService;
    let breadcrumbsService: BreadcrumbsService;


    beforeEach(function () {
        fakeCoursesService =
            {
                addCourse: function (course: Course): any { },
                updateCourse: function (course: Course): any { },

            };
        spyOn(fakeCoursesService, 'addCourse');
        spyOn(fakeCoursesService, 'updateCourse');
        coursesEditComponent = new CourseEditComponent(fakeCoursesService, route, router, formBuilder, authorsService, notification, breadcrumbsService
        );

    });

    it('Should call CoursesService addCourse when new course save', () => {
        var newCourse = new Course({ title: "test", description: 'testDescr', duration: 100, date: new Date() });
        coursesEditComponent.saveToServer(newCourse);
        expect(fakeCoursesService.addCourse).toHaveBeenCalled();
        expect(fakeCoursesService.addCourse).toHaveBeenCalledWith(newCourse);
    });

}); 
