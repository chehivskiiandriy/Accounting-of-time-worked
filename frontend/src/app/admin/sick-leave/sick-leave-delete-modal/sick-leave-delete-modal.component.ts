import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { SickLeaveService } from './../../../_services/sick-leave.service';

import { error } from './../../../shared/alert';

@Component({
  selector: 'app-sick-leave-delete-modal',
  templateUrl: './sick-leave-delete-modal.component.html',
  styleUrls: ['./sick-leave-delete-modal.component.scss']
})
export class SickLeaveDeleteModalComponent implements OnInit {

  sickLeave: any = {};

  constructor(public dialogRef: MatDialogRef<SickLeaveDeleteModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private sickLeaveService: SickLeaveService) { }

  ngOnInit() {
    this.sickLeave = this.data.sickLeave;
  }

  deleteSickLeave() {
    this.sickLeaveService.delete(this.sickLeave);
    this.alert();
  }

  alert() {
    let s = setInterval(() => {
      if (this.sickLeaveService.success !== undefined) {
        clearInterval(s);
        if (this.sickLeaveService.success) {
          this.dialogRef.close();
        } else {
          error();
        }
      }
    }, 50);

  }
}
