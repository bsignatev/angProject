import { Injectable } from '@angular/core';
import { ApiService } from "../services";
import { Author } from '../entities'
import { AppActions } from '../app.actions';

@Injectable()
export class AuthorsService {

  constructor(private api: ApiService,
    private appActions: AppActions) {
    this.getAllAuthors();
  }

  getAllAuthors() {
    return this.api.get('/authors')
      .map(res => res.items as Author[]).subscribe(res => {
        this.appActions.dispatch(AppActions.AUTHORS_LOADED, res);
      });
  }
}