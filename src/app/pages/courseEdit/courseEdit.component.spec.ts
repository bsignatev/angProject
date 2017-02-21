
import { Course } from '../../entities';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { CourseEditComponent } from './courseEdit.component';
import { CoursesService, AuthorsService, NotificationService, BreadcrumbsService, ApiService } from '../../services';
import { ComponentFixture, TestBed, ComponentFixtureAutoDetect, async } from '@angular/core/testing';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppActions } from '../../app.actions';
import { Store } from '@ngrx/store';

import { NumToTime } from '../../pipes/numToTime';
import { Subject } from "rxjs";

describe('CourseEdit component', () => {
    let fakeCoursesService;
    let coursesEditComponent: CourseEditComponent;
    let fixture: ComponentFixture<CourseEditComponent>;
    let observer = new Subject();

    beforeEach(async(() => {
        fakeCoursesService = {
            addCourse: jasmine.createSpy(''),
            updateCourse: jasmine.createSpy(''),
            getCourseFromStore: (() => { })
        };

        TestBed.configureTestingModule({
            imports: [RouterTestingModule, FormsModule, ReactiveFormsModule],
            declarations: [NumToTime, CourseEditComponent],
            providers: [
                { provide: CoursesService, useValue: fakeCoursesService },
                { provide: AuthorsService, useValue: {} },
                { provide: NotificationService, useValue: { showNotification: (() => { }) } },
                { provide: BreadcrumbsService, useValue: { setBreadCrumb: (() => { }) } },
                { provide: Store, useValue: { select: (() => observer), replaceReducer: (() => { }) } },
                { provide: AppActions, useValue: {} },

            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        }).compileComponents()
            .then(() => {
                fixture = TestBed.createComponent(CourseEditComponent);
                coursesEditComponent = fixture.componentInstance;
                fixture.detectChanges();
            });
    }));

    it('should have a defined component', async(() => {
        expect(coursesEditComponent).toBeDefined();
    }));

    // it('should have a no defined component', () => {
    // expect(coursesEditComponent).not.toBeDefined();
    // });

    it('Should call CoursesService addCourse when new course save', () => {
        var newCourse = new Course({ title: "fromTest", description: 'from test Descr', duration: 100, date: new Date() });
        coursesEditComponent.saveToServer(newCourse);
        expect(fakeCoursesService.addCourse).toHaveBeenCalled();
        // expect(fakeCoursesService.addCourse).toHaveBeenCalledWith(newCourse);
    });
}); 
