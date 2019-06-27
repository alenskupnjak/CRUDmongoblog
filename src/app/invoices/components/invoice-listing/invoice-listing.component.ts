import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { InvoiceService } from '../../services/invoice.service';
import { Invoice } from '../../models/invoice';
import { Router } from '@angular/router';
import { MatSnackBar, MatPaginator, MatSort } from '@angular/material';
import { remove } from 'lodash';
// tslint:disable-next-line:import-blacklist
// import 'rxjs/Rx';
import { InternalNgModuleRef } from '@angular/core/src/linker/ng_module_factory';
import { InternalViewRef } from '@angular/core/src/linker/view_ref';
import { DialogService } from '../../../shared/dialog.service';

@Component({
  selector: 'app-invoice-listing',
  templateUrl: './invoice-listing.component.html',
  styleUrls: ['./invoice-listing.component.scss']
})

export class InvoiceListingComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['item', 'date', 'due', 'qty', 'rate', 'tax', 'bris', 'action'];
  dataSource: Invoice[] = [];
  brojStranica = 0;
  usnimavanje = false;
  listaZaBrisanje: any [] = [];

  constructor(
    private invoiceService: InvoiceService,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialogService: DialogService) { }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


   ngOnInit() {
  }

ngAfterViewInit(): void {
  this.usnimavanje = true;
  this.paginator.page.subscribe( () => {
    return this.invoiceService.getInvoices({
      page: this.paginator.pageIndex,
      perPage: this.paginator.pageSize,
      sortField: this.sort.active,
      sortDir: this.sort.direction,
      filter: ''
    })
    .subscribe( data => {
      this.dataSource = data.docs;
      this.brojStranica = data.total;
      // this.usnimavanje = false;
      });
  }, err =>  this.errorHandler(err, 'Ucitavanje nije uspjelo'));

  // this.usnimavanje = true;
  this.sort.sortChange.subscribe(() => {
    return this.invoiceService.getInvoices({
      page: this.paginator.pageIndex,
      perPage: this.paginator.pageSize,
      sortField: this.sort.active,
      sortDir: this.sort.direction,
      filter: ''
    })
    .subscribe( data => {
      this.dataSource = data.docs;
      this.brojStranica = data.total;
      // this.usnimavanje = false;
      });
  });
  this.populatedInvoices();
}

  private populatedInvoices() {
    this.invoiceService.getInvoices({
      page: this.paginator.pageIndex,
      perPage: this.paginator.pageSize,
      sortField: this.sort.active,
      sortDir: this.sort.direction,
      filter: ''
    })
    .subscribe( data => {
        this.dataSource = data.docs;
        this.brojStranica = data.total;
      }, err => { this.errorHandler(err, 'Ucitavanje nije uspjelo');
    });

    this.usnimavanje = false;
  }

  deleteZapis(id) {
    this.dialogService.openConfirmDialog('Are you sure to delete this record ?')
    .afterClosed().subscribe(dat => {
      if (dat) {
        this.invoiceService.deleteInvoice(id).subscribe(
           data => {
             remove(this.dataSource, (item) => { return item._id === data._id });
              this.dataSource = [...this.dataSource];
              this.snackBar.open('Invoices obrisan', 'ok', {
              duration: 3000
            });
         }, err => {
          this.errorHandler(err, 'Brisanje nije uspjelo');
         });
     }
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

  obrisiVise() {
    const brojbrisanih = this.listaZaBrisanje.length;
    if (this.listaZaBrisanje.length === 0)  { return; }

    this.listaZaBrisanje.forEach( data => {
         this.deleteZapis(data);
        });



    this.listaZaBrisanje = [];
    this.brojStranica = this.brojStranica - brojbrisanih;
  }


  pripremiZaBrisanje(key) {
    // let duljinaZapisa = this.listaZaBrisanje.length;
    let trazim = -1;
    this.listaZaBrisanje.forEach((data, index) => {
      console.log ( `index=${index}` );
      if (data === key) {
        trazim = index ;
        console.log(data, key);
        console.log(`Naso ga`);
      }
    });
    if (trazim === -1) { this.listaZaBrisanje.push(key); }
    if (trazim !== -1 ) { this.listaZaBrisanje.splice(trazim, 1); }
    console.log(`Kraj`);
    console.log(this.listaZaBrisanje);
    return this.listaZaBrisanje;
  }

  filterText(filterValue: string) {
    this.usnimavanje = true;
    filterValue = filterValue.trim();
    this.paginator.pageIndex = 0;
    this.invoiceService.getInvoices({
      page: this.paginator.pageIndex,
      perPage: this.paginator.pageSize,
      sortField: this.sort.active,
      sortDir: this.sort.direction,
      filter: filterValue
    })
    .subscribe(data => {
      this.dataSource = data.docs;
      this.brojStranica = data.total;
      this.usnimavanje = false;
    }, err => this.errorHandler(err, ' Neuspjesno filtriranje'));
  }

}
