import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { WorkingDaysService } from './../../../_services/working-days.service';

import { error } from './../../../shared/alert';

@Component({
  selector: 'app-working-days-delete-modal',
  templateUrl: './working-days-delete-modal.component.html',
  styleUrls: ['./working-days-delete-modal.component.scss']
})
export class WorkingDaysDeleteModalComponent implements OnInit {

  workingDays: any = {};

  constructor(public dialogRef: MatDialogRef<WorkingDaysDeleteModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private workingDaysService: WorkingDaysService) { }

  ngOnInit() {
    this.workingDays = this.data.workingDay;
  }

  deleteWorkingDays() {
    this.workingDaysService.delete(this.workingDays);
    this.alert();
  }

  alert() {
    let s = setInterval(() => {
      if (this.workingDaysService.success !== undefined) {
        clearInterval(s);
        if (this.workingDaysService.success) {
          this.dialogRef.close();
        } else {
          error();
        }
      }
    }, 50);

  }

}
