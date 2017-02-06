import { Injectable } from '@angular/core';
import { ApiService } from "../services";
import { Author } from '../entities'
import { Router, ActivatedRoute, Params, UrlSegment } from '@angular/router';
import { Breadcrumbs } from '../entities';

@Injectable()
export class BreadcrumbsService {
  elements: Array<Breadcrumbs> = new Array<Breadcrumbs>();
  constructor(
    private router: ActivatedRoute
  ) {}

  getBreadcrumbs(): Breadcrumbs[] {
    return this.elements;
  }

  setBreadCrumb(params: UrlSegment[]): void {
    this.elements = [];
    params.forEach(el => this.elements.push(new Breadcrumbs("/" + el.path, el.path, false)));
  }

  changeTitle(oldtitle: string, newTitle: string) {
    this.elements.forEach(el => {
      if (el.title == oldtitle) {
        el.title = newTitle;
        el.isLeaf = true;
      }
    });
  }
}
