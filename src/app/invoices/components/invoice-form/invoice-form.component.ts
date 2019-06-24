import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { InvoiceService } from '../../services/invoice.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar,
         MatSnackBarHorizontalPosition,
         MatSnackBarVerticalPosition } from '@angular/material';
import { Invoice } from '../../models/invoice';


@Component({
  selector: 'app-invoice-form',
  templateUrl: './invoice-form.component.html',
  styleUrls: ['./invoice-form.component.scss']
})
export class InvoiceFormComponent implements OnInit {
 private invoice: Invoice;
 invoiceForm: FormGroup;
 horizontalPosition: MatSnackBarHorizontalPosition = 'start';
 verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(
    private fb: FormBuilder,
    private invoiceService: InvoiceService,
    private snackBar: MatSnackBar,
    private router: Router,
    private jednaRouta: ActivatedRoute) { }

    createForm() {
      this.invoiceForm = this.fb.group({
        item: ['', Validators.required],
        date: ['', Validators.required],
        due: ['', Validators.required],
        qty: ['', Validators.required],
        rate: '',
        tax: ''
      });
    }

    ngOnInit() {
      this.createForm();
      this.setInvoiceForm();
    }

  onSubmit() {
    // invoice je undefine ako je želimo novi zapis novi zapis
    if (this.invoice) {
    this.invoiceService.updateInvoice(this.invoice._id , this.invoiceForm.value)
    .subscribe(data => {
      this.snackBar.open('Invoice updated', 'OK',
      { duration: 2000 }
      );
      this.router.navigate(['dasboard', 'invoices']);
    }, err => this.errorHandler(err, 'Nisam uspio osvježiti podatak'));

    } else {
      console.log(this.invoiceForm.value);
      this.invoiceService.createInvoice(this.invoiceForm.value).subscribe(
        data => {
          console.log(data);
          this.snackBar.open('Invoice created', 'Success', {
            duration: 3000,
            horizontalPosition: this.horizontalPosition
          });
          // this.router.navigate(['dasboard', 'invoices']);
          // this.invoiceForm.reset();
      }, err => {
        this.errorHandler(err, 'Ne mogu snimiti podatak');
      });
    }
  }

 setInvoiceForm() {
  this.jednaRouta.params.
     subscribe( data => {
        const id = data['id'];
        if (!id) { return; }
        this.invoiceService.editInvoice(id)
        .subscribe( sviPodaciForme => {
          this.invoice = sviPodaciForme;
          this.invoiceForm.patchValue(this.invoice);
        }, err => this.errorHandler(err, 'Nisam nasao zapis'));
     });
 }



  private errorHandler(err, message) {
    console.error(err);
    this.snackBar.open(message, 'Error', {
      duration: 2000
    });
  }


}


