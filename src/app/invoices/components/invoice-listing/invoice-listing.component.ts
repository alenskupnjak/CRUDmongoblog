import { Component, OnInit } from '@angular/core';
import { InvoiceService } from '../../services/invoice.service';
import { Invoice } from '../../models/invoice';
import { Router } from '@angular/router';

@Component({
  selector: 'app-invoice-listing',
  templateUrl: './invoice-listing.component.html',
  styleUrls: ['./invoice-listing.component.scss']
})



export class InvoiceListingComponent implements OnInit {

  displayedColumns: string[] = ['item', 'date', 'due', 'qty', 'rate', 'tax', 'action'];
  dataSource: Invoice[] = [];

  constructor(
    private invoiceService: InvoiceService,
    private router: Router) { }

  ngOnInit() {
    this.invoiceService.getInvoices().subscribe( data => {
     this.dataSource = data;
    }, err => {
      console.error(err);
    });
  }

  saveForm() {
    this.router.navigate(['dashboard', 'invoices', 'new']);
  }

}
