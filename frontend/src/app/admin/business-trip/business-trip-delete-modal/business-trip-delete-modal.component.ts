import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { BusinessTripService } from './../../../_services/business-trip.service';

import { error } from './../../../shared/alert';

@Component({
  selector: 'app-business-trip-delete-modal',
  templateUrl: './business-trip-delete-modal.component.html',
  styleUrls: ['./business-trip-delete-modal.component.scss']
})
export class BusinessTripDeleteModalComponent implements OnInit {

  businessTrip: any = {};
  
  constructor(public dialogRef: MatDialogRef<BusinessTripDeleteModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private businessTripService: BusinessTripService) { }

  ngOnInit() {
    this.businessTrip = this.data.businessTrip;
  }

  deleteBusinessTrip() {
    this.businessTripService.delete(this.businessTrip);
    this.alert();
  }

  alert() {
    let s = setInterval(() => {
      if (this.businessTripService.success !== undefined) {
        clearInterval(s);
        if (this.businessTripService.success) {
          this.dialogRef.close();
        } else {
          error();
        }
      }
    }, 50);

  }
  

}
