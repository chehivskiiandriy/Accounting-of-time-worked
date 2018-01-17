import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { HookyService } from './../../../_services/hooky.service';

import { error } from './../../../shared/alert';

@Component({
  selector: 'app-hooky-delete-modal',
  templateUrl: './hooky-delete-modal.component.html',
  styleUrls: ['./hooky-delete-modal.component.scss']
})
export class HookyDeleteModalComponent implements OnInit {

  hooky: any = {};

  constructor(public dialogRef: MatDialogRef<HookyDeleteModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private hookyService: HookyService) { }

  ngOnInit() {
    this.hooky = this.data.hooky;
  }

  deleteHooky() {
    this.hookyService.delete(this.hooky);
    this.alert();
  }

  alert() {
    let s = setInterval(() => {
      if (this.hookyService.success !== undefined) {
        clearInterval(s);
        if (this.hookyService.success) {
          this.dialogRef.close();
        } else {
          error();
        }
      }
    }, 50);

  }

}
