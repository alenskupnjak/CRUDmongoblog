import { Component, OnInit } from '@angular/core';
import { InvoiceService } from '../../services/invoice.service';
import { Invoice } from '../../models/invoice';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { remove } from 'lodash';

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
    private router: Router,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.invoiceService.getInvoices().subscribe( data => {
     this.dataSource = data;
    }, err => {
      this.errorHandler(err, 'Ucitavanje nije uspjelo');
    });
  }

  deleteZapis(id) {
    this.invoiceService.deleteInvoice(id).subscribe(
      data => {
       console.log(data);
       remove(this.dataSource, (item) => { return item._id === data._id});
       this.dataSource = [...this.dataSource];
        this.snackBar.open('Invoices obrisan', 'ok', {
          duration: 3000
        });
      }, err => {
       this.errorHandler(err, 'Brisanje nije uspjelo');
      });
  }

  editirajFormu(id) {
    this.router.navigate(['dashboard', 'invoices', id]);
  }
  
  saveForm() {
    this.router.navigate(['dashboard', 'invoices', 'new']);
  }


  private errorHandler(err, message) {
    console.error(err);
    this.snackBar.open(message, 'Error', {
      duration: 2000
    });
  }

}
