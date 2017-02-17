
import { Course } from '../../entities';
import { CourseEditComponent } from './courseEdit.component';
import { CoursesService, AuthorsService, NotificationService, BreadcrumbsService, ApiService } from '../../services';
import { ComponentFixture, TestBed, ComponentFixtureAutoDetect, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

describe('CourseEdit component', () => {
    let fakeCoursesService;
    let coursesEditComponent: CourseEditComponent;
    let fixture: ComponentFixture<CourseEditComponent>;

    let route: ActivatedRoute;
    let router: Router;
    let formBuilder: FormBuilder;
    let authorsService: AuthorsService;
    let notification: NotificationService;
    let breadcrumbsService: BreadcrumbsService;
    let apiService: ApiService

    beforeEach(() => {
        fakeCoursesService = {
            addCourse: jasmine.createSpy(''),
            updateCourse: jasmine.createSpy('')

        };
        //spyOn(fakeCoursesService, 'addCourse');
        //spyOn(fakeCoursesService, 'updateCourse');

        TestBed.configureTestingModule({
            //imports: [Router],
            declarations: [CourseEditComponent],
            providers: [
                { provide: CoursesService, useValue: fakeCoursesService }
            ],
        }).compileComponents()
            .then(() => {
                fixture = TestBed.createComponent(CourseEditComponent);
                coursesEditComponent = fixture.componentInstance;
                fixture.detectChanges();
            });
    });

    it('should have a defined component', () => {
        expect(coursesEditComponent).toBeDefined();
    });

    it('should have a no defined component', () => {
        expect(coursesEditComponent).not.toBeDefined();
    });

    it('Should call CoursesService addCourse when new course save', () => {
        var newCourse = new Course({ title: "fromTest", description: 'from test Descr', duration: 100, date: new Date() });
        coursesEditComponent.saveToServer(newCourse);
        expect(fakeCoursesService.addCourse).toHaveBeenCalled();
        expect(fakeCoursesService.addCourse).toHaveBeenCalledWith(newCourse);
    });
}); 
