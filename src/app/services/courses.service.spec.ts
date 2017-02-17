import { TestBed, inject, fakeAsync, async, tick } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { CoursesService, ApiService, LoadingService, NotificationService, LoginService } from './';
import { Course } from '../entities'
import { NotificationComponent } from '../components/notification';

xdescribe('CoursesService web api calls', () => {
  let coursesService: CoursesService;

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        CoursesService,
        ApiService,
        LoadingService,
        NotificationService,
        LoginService,
        NotificationComponent
      ]
    });
  });


  beforeEach(inject([CoursesService], (service: CoursesService) => {
    coursesService = service;
  }));

  it('should return items list from server', done => {
    //coursesService.getCourses().subscribe((items: Course[]) => {
     // expect(items.length).toBeGreaterThan(0);
      done();
    });
  });

  //it('should be able to add item server', done => {
   // coursesService.getCourses().subscribe((items: Course[]) => {
   //   let itemsCount = items.length;

    //  let newCourse = new Course({ title: "from test", description: 'from test Descr', duration: 100, date: new Date() });
    //  coursesService.addCourse(newCourse).subscribe((item: Course) => {

    //    coursesService.getCourses().subscribe((items: Course[]) => {
    //      expect(items.length).toBe(itemsCount + 1);
        
    //    });

     //   coursesService.deleteCourse(item.id).subscribe(() => {
     //       done();
     //   });
    //  });
   // });
  //});

//});