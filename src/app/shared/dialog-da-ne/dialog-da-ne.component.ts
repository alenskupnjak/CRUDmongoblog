import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-dialog-da-ne',
  templateUrl: './dialog-da-ne.component.html',
  styleUrls: ['./dialog-da-ne.component.scss']
})
export class DialogDaNeComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<DialogDaNeComponent>) { }

  ngOnInit() {
  }


  closeDialog() {
    this.dialogRef.close(false);
  }

}
