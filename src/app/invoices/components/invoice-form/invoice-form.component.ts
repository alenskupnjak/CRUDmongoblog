import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { InvoiceService } from '../../services/invoice.service';
import { MatSnackBar,  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition } from '@angular/material';
import { Router } from '@angular/router';


@Component({
  selector: 'app-invoice-form',
  templateUrl: './invoice-form.component.html',
  styleUrls: ['./invoice-form.component.scss']
})
export class InvoiceFormComponent implements OnInit {

 invoiceForm: FormGroup;
 horizontalPosition: MatSnackBarHorizontalPosition = 'start';
 verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(
    private fb: FormBuilder,
    private invoiceService: InvoiceService,
    private snackBar: MatSnackBar,
    private router: Router) { }

  ngOnInit() {
    this.createForm();
  }

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

  onSubmit() {
    console.log(this.invoiceForm.value);
    this.invoiceService.createInvoice(this.invoiceForm.value).subscribe(
      data => {
        console.log(data);
        this.snackBar.open('Invoice created', 'Success', {
          duration: 3000,
          horizontalPosition: this.horizontalPosition
        });
        // this.router.navigate(['dasboard', 'incoices']);
        this.router.navigate(['dasboard/incoices']);
        // this.invoiceForm.reset();
    }, err => {
      this.errorHandler(err, 'Ne mogu snimiti podatak');
    });
  }

  private errorHandler(err, message) {
    console.error(err);
    this.snackBar.open(message, 'Error', {
      duration: 2000
    });
  }


}


