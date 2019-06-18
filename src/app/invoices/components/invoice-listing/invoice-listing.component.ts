import { Component, OnInit, ViewChild } from '@angular/core';
import { InvoiceService } from '../../services/invoice.service';
import { Invoice } from '../../models/invoice';
import { Router } from '@angular/router';
import { MatSnackBar, MatPaginator } from '@angular/material';
import { remove } from 'lodash';
import { InternalNgModuleRef } from '@angular/core/src/linker/ng_module_factory';
import { InternalViewRef } from '@angular/core/src/linker/view_ref';

@Component({
  selector: 'app-invoice-listing',
  templateUrl: './invoice-listing.component.html',
  styleUrls: ['./invoice-listing.component.scss']
})

export class InvoiceListingComponent implements OnInit {

  displayedColumns: string[] = ['item', 'date', 'due', 'qty', 'rate', 'tax', 'action'];
  dataSource: Invoice[] = [];
  brojStranica = 0;

  constructor(
    private invoiceService: InvoiceService,
    private router: Router,
    private snackBar: MatSnackBar) { }

    @ViewChild(MatPaginator) paginator: MatPaginator;


  ngOnInit() {
    this.populatedInvoices();
  }

  private populatedInvoices() {
    this.invoiceService.getInvoices().subscribe( data => {
      this.dataSource = data.docs;
      console.log(data);
      this.brojStranica = data.total;
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
