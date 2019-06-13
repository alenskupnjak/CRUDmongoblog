import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'dashboard-builder',
  template: `
  <app-side-nav></app-side-nav>
 `,
  // templateUrl: './invoice-builder.component.html',
})
export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
