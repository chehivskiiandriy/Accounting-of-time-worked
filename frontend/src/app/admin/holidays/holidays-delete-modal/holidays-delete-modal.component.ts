import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { HolidaysService } from './../../../_services/holidays.service';

import { error } from './../../../shared/alert';

@Component({
  selector: 'app-holidays-delete-modal',
  templateUrl: './holidays-delete-modal.component.html',
  styleUrls: ['./holidays-delete-modal.component.scss']
})
export class HolidaysDeleteModalComponent implements OnInit {

  holiday: any = {};

  constructor(public dialogRef: MatDialogRef<HolidaysDeleteModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private holidaysService: HolidaysService) { }

  ngOnInit() {
    this.holiday = this.data.holiday;
  }

  deleteHoliday() {
    this.holidaysService.delete(this.holiday);
    this.alert();
  }

  alert() {
    let s = setInterval(() => {
      if (this.holidaysService.success !== undefined) {
        clearInterval(s);
        if (this.holidaysService.success) {
          this.dialogRef.close();
        } else {
          error();
        }
      }
    }, 50);

  }

}
