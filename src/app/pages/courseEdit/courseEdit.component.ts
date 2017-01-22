import { DatePipe } from '@angular/common';
import { Subscription } from 'rxjs/Subscription';
import { CoursesService, AuthorsService } from '../../services';
import { Course, Author } from '../../entities';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'courseEdit',
    templateUrl: './courseEdit.component.html',
    styleUrls: ['./courseEdit.component.css'],
    providers: [AuthorsService]
})

export class CourseEditComponent implements OnInit {

    editForm: FormGroup;
    id: string;
    course: Course = new Course();
    allAuthors: Author[] = new Array<Author>();
    authors: Author[] = new Array<Author>();

    constructor(
        private coursesService: CoursesService,
        private route: ActivatedRoute,
        private router: Router,
        private formBuilder: FormBuilder,
        private authorsService: AuthorsService
    ) {
        this.buildForm();
    }

    ngOnInit(): void {

        this.route.params.forEach((params: Params) => this.id = params['id']);

        if (this.id === "new") {
            this.course = new Course();
            this.authorsService.getAllAuthors().subscribe(allAuthors => {

                this.allAuthors = allAuthors;

            });
        } else {
            this.coursesService.getCourse(this.id).subscribe(course => {
                this.course = course;
                this.authorsService.getAllAuthors().subscribe(allAuthors => {
                    if (this.course.authors.length > 0) {
                        this.authors = allAuthors.filter(author => this.course.authors.find(id => id == author.id));
                        this.allAuthors = allAuthors.filter(author => !this.course.authors.find(id => id == author.id));

                    } else {
                        this.allAuthors = allAuthors;
                    }
                    this.buildForm();
                });
            });
        }
    }

    buildForm(): void {
        let datePipe = new DatePipe('En-us');
        this.editForm = this.formBuilder.group({
            'title': [this.course.title, Validators.required],
            'description': [this.course.description, Validators.required],
            'date': [datePipe.transform(this.course.date, 'dd.MM.yyyy'), [Validators.required]],
            'duration': [this.course.duration, Validators.required]
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
            //alert("error");
            return;
        } else {
            this.course.title = value.title;
            this.course.description = value.description;
            const splited = value.date.split('.');
            this.course.date = new Date(+splited[2], +splited[1] - 1, +splited[0]);
            this.course.duration = value.duration;

            if (!this.course.id) {
                this.coursesService.addCourse(this.course)
                    .subscribe(() => {
                        this.router.navigate(['/courses']);
                    });
            }
            else {
                this.coursesService.updateCourse(this.course)
                    .subscribe(() => {
                        this.router.navigate(['/courses']);
                    });
            }
        }
    }

    cancel() {
        this.router.navigate(['/courses']);
    }
}