import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { MatDialog } from '@angular/material';

import { BusinessTripService } from './../../_services/business-trip.service';

import { BusinessTripAddModalComponent } from './business-trip-add-modal/business-trip-add-modal.component';
import { BusinessTripEditModalComponent } from './business-trip-edit-modal/business-trip-edit-modal.component';

@Component({
  selector: 'app-business-trip',
  templateUrl: './business-trip.component.html',
  styleUrls: ['./business-trip.component.scss']
})
export class BusinessTripComponent implements OnInit {

  displayedColumns = ['#', 'Full name', 'Employee ID', 'Subdivision', 'Start business trip', 'Finish business trip', 'Actions'];
  businessTrips: Observable<any[]>;

  constructor( public dialog: MatDialog, private businessTripService: BusinessTripService) {}

  ngOnInit() {
    this.businessTrips = this.businessTripService.businessTrips;
    this.businessTripService.getAll();
    console.log(this.businessTrips);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(BusinessTripAddModalComponent, {
      height: '550px',
      width: '400px',
    });
  }
}
