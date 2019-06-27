import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { DialogDaNeComponent } from 'src/app/shared/dialog-da-ne/dialog-da-ne.component';

@Injectable({
  providedIn: 'root'
})


export class DialogService {

  constructor(private dialog: MatDialog) { }


  openConfirmDialog(msg) {
    return this.dialog.open(DialogDaNeComponent, {
      width: '400px',
      panelClass: 'confirm-dialog-container',
      disableClose : true,
      data : {
        message: msg
      }
    });
  }



}
