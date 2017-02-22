import { DatePipe } from '@angular/common';
import { Subscription, Observable } from 'rxjs';
import { CoursesService, AuthorsService, BreadcrumbsService } from '../../services';
import { Course, Author } from '../../entities';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router, UrlSegment } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NotificationService } from '../../services';
import { AppActions } from '../../app.actions';
import { authorsReducer, courseReducer, coursesReducer } from '../reducers';
import { PageComponent } from '../page.component';
import { Store } from '@ngrx/store';

@Component({
    selector: 'courseEdit',
    template: require('./courseEdit.component.html'),
    styles: [require('./courseEdit.component.css')],
})

export class CourseEditComponent extends PageComponent {

    editForm: FormGroup;
    id: string;
    course: Course = new Course();
    allAuthors: Author[] = new Array<Author>();
    authors: Author[] = new Array<Author>();
    title: string;

    constructor(
        private coursesService: CoursesService,
        private route: ActivatedRoute,
        private router: Router,
        private formBuilder: FormBuilder,
        private authorsService: AuthorsService,
        private notification: NotificationService,
        private breadcrumbsService: BreadcrumbsService,
        private store: Store<any>,
        private appActions: AppActions

    ) {
        super(store, { courseReducer, authorsReducer, coursesReducer });
        this.buildForm();
    }

    onInit() {

        this.route.params.forEach((params: Params) => this.id = params['id']);
        this.breadcrumbsService.setBreadCrumb(this.route.snapshot.url);
        this.coursesService.getCourseFromStore(this.id);
     
        this._subscriptions([
            Observable.combineLatest(
                this.store.select(state => state.authorsReducer),
                this.store.select(state => state.courseReducer))
                .subscribe(([authors, course]) => {
                    this.course = course as Course;
                    this.allAuthors = authors.slice();
                    this.breadcrumbsService.changeTitle(this.id, this.course.title);
                    this.title = this.course.title;
                    if (this.course.authors.length > 0) {

                        this.authors = this.allAuthors.filter(author => this.course.authors.find(id => id == author.id));
                        this.allAuthors = this.allAuthors.filter(author => !this.course.authors.find(id => id == author.id));

                    } else {
                        this.allAuthors = this.allAuthors;
                    }
                    this.buildForm();
                })
        ]);
    }

    buildForm(): void {
        let datePipe = new DatePipe('En-us');
        this.editForm = this.formBuilder.group({
            'title': [this.course.title, Validators.required],
            'description': [this.course.description, Validators.required],
            'date': [datePipe.transform(this.course.date, 'dd.MM.yyyy'), [Validators.required]],
            'duration': [this.course.duration, Validators.required]
        });

        this.editForm.controls['title'].valueChanges.subscribe((title: string) => {
            this.changeTitle(title);
        });
    }

    selectAuthor(author: Author) {
        author.isSelected = !author.isSelected;
    }

    moveAuthorToList() {
        this.authors = [...this.authors, ...this.allAuthors.filter(i => i.isSelected)];
        this.allAuthors = this.allAuthors.filter(i => !i.isSelected);
        this.authors.forEach(i => i.isSelected = false);
    }

    moveAuthorFromList() {
        this.allAuthors = [...this.allAuthors, ...this.authors.filter(i => i.isSelected)];
        this.authors = this.authors.filter(i => !i.isSelected);
        this.allAuthors.forEach(i => i.isSelected = false);
    }

    saveCourse(value: any) {
        if (!this.editForm.valid) {
            this.notification.showNotification('Fill in the fields!')
            return;
        } else {
            this.course.title = value.title;
            this.course.description = value.description;
            const splited = value.date.split('.');
            this.course.date = new Date(+splited[2], +splited[1] - 1, +splited[0]);
            this.course.duration = value.duration;
            this.course.authors = this.authors.map(i => i.id);
            this.saveToServer(this.course);
        }
    }

    saveToServer(course: Course) {
        if (!this.course.id) {
            this.coursesService.addCourse(this.course);
        }
        else {
            this.coursesService.updateCourse(this.course);
        }
        this.router.navigate(['/courses']);

    }

    changeTitle(newTitle) {
        this.breadcrumbsService.changeTitle(this.title, newTitle);
        this.title = newTitle;
    }

    cancel() {
        this.router.navigate(['/courses']);
    }
}