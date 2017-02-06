import { Component, ViewEncapsulation } from '@angular/core';
import { AppState } from './app.service';
import { BreadcrumbsService } from '../../services/breadcrumbs.service';
import { Breadcrumbs } from '../../entities';

@Component({
  selector: 'selector-breadcrumbs',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    './breadcrumbs.component.css'
  ],
  templateUrl: './breadcrumbs.component.html'

})
export class BreadcrumbsComponent {
  breadcrumbs: Array<Breadcrumbs> = Array<Breadcrumbs>();

  constructor(private breadcrumbsService: BreadcrumbsService)
  { }


  ngOnInit(): void {
    this.breadcrumbs = this.breadcrumbsService.getBreadcrumbs();
  }
}