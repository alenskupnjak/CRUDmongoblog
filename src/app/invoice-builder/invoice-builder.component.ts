import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-invoice-builder',
  template: `
  <app-side-nav></app-side-nav>
 `,
  // templateUrl: './invoice-builder.component.html',
  styleUrls: ['./invoice-builder.component.css']
})
export class InvoiceBuilderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
