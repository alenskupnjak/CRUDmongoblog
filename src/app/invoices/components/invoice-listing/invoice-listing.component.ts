import { Component, OnInit, ViewChild } from '@angular/core';
import { InvoiceService } from '../../services/invoice.service';
import { Invoice } from '../../models/invoice';
import { Router } from '@angular/router';
import { MatSnackBar, MatPaginator } from '@angular/material';
import { remove } from 'lodash';
// tslint:disable-next-line:import-blacklist
// import 'rxjs/Rx';
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
    this.paginator
     .page
     .subscribe( data => {
      this.invoiceService
      .getInvoices({page: ++data.pageIndex, perPage: data.pageSize})
      .subscribe( data => {
        this.dataSource = data.docs;
        this.brojStranica = data.total;
        });
    }, err =>  this.errorHandler(err, 'Ucitavanje nije uspjelo'));
         this.populatedInvoices();
  }

  private populatedInvoices() {
    this.invoiceService.getInvoices({page: 1, perPage: 10})
    .subscribe( data => {
        this.dataSource = data.docs;
        this.brojStranica = data.total;
     }, err => { this.errorHandler(err, 'Ucitavanje nije uspjelo');
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
