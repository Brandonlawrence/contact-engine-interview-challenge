import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {SuccessDialogData} from '../../../models/interfaces/success-dialog-data';

@Component({
  selector: 'app-form-success-modal',
  templateUrl: './form-success-modal.component.html',
  styleUrls: ['./form-success-modal.component.scss']
})
export class FormSuccessModalComponent implements OnInit {
  constructor(public modalRef: MatDialog, @Inject(MAT_DIALOG_DATA) public data: SuccessDialogData) {
  }

  ngOnInit(): void {
  }

  closeDialog() {
    this.modalRef.closeAll();
  }
}
