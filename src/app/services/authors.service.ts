import {Injectable} from '@angular/core';
import {ApiService} from "../services";
import { Author } from '../entities'

@Injectable()
export class AuthorsService {

  constructor( private api: ApiService) {}

  getAllAuthors() {
    return this.api.get('/authors')
      .map(res => res.items as Author[])
   
  }
}