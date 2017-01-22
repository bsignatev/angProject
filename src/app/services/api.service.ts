import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import 'rxjs/add/observable/throw';
import { NotificationService } from './notification.service';
import { LoadingService } from './loading.service'


@Injectable()
export class ApiService {
  headers: Headers = new Headers({
    'Content-Type': 'application/json',
    Accept: 'application/json'
  });
  api_url: string = 'https://my-bootcamp.herokuapp.com';

  constructor(private http: Http, private loadingService: LoadingService, private notification: NotificationService) {
  }

  private checkForError(response: Response): Response | Observable<any> {
    if (response.status === 401) {
      //console.error('Unauthorized access attempt');
      this.notification.showNotification('Unauthorized access attempt');
      this.loadingService.toggleLoadingIndicator(false)
    }
    if (response.status >= 200 && response.status < 300) {
      return response;
    } else {
      let error = new Error(response.statusText);
      const body = response.json();
      //console.error(body.message);
      this.loadingService.toggleLoadingIndicator(false)
      this.notification.showNotification(body.message);
      error['response'] = response;
      return Observable.throw(error);
    }
  }

  get(path: string): Observable<any> {
    this.loadingService.toggleLoadingIndicator(true)
    return this.http.get(`${this.api_url}${path}`, { headers: this.headers })
      .catch(this.checkForError.bind(this))
      .do((r: Response) => {
        this.loadingService.toggleLoadingIndicator(false)
        console.dir(r);
      })
      .map((r: Response) => r.json())
  }

  post(path: string, body: any): Observable<any> {
    this.loadingService.toggleLoadingIndicator(true)
    return this.http.post(
      `${this.api_url}${path}`,
      JSON.stringify(body),
      { headers: this.headers }
    )
      .catch(this.checkForError.bind(this))
      .do((r: Response) => {
        this.loadingService.toggleLoadingIndicator(false)
        console.dir(r);
      })
      .map((r: Response) => r.json())
  }

  delete(path: string): Observable<any> {
    this.loadingService.toggleLoadingIndicator(true)
    return this.http.delete(
      `${this.api_url}${path}`,
      { headers: this.headers }
    )
      .catch(this.checkForError.bind(this))
      .do((r: Response) => {
        this.loadingService.toggleLoadingIndicator(false)
        console.dir(r);
      })
  }

  put(path: string, body: any): Observable<any> {
    this.loadingService.toggleLoadingIndicator(true)
    return this.http.put(
      `${this.api_url}${path}`,
      JSON.stringify(body),
      { headers: this.headers }
    )
      .catch(this.checkForError.bind(this))
      .do((r: Response) => {
        this.loadingService.toggleLoadingIndicator(false)
        console.dir(r);
      })
      .map((r: Response) => r.json())
  }


  setHeaders(headers) {
    Object.keys(headers).forEach(header => this.headers.set(header, headers[header]));
  }
}