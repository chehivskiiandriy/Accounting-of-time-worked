import { Component, OnInit, AfterViewChecked  } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { MatDialog } from '@angular/material';

import { BusinessTripService } from './../../_services/business-trip.service';

import { BusinessTripAddModalComponent } from './business-trip-add-modal/business-trip-add-modal.component';
import { BusinessTripEditModalComponent } from './business-trip-edit-modal/business-trip-edit-modal.component';
import { BusinessTripDeleteModalComponent } from './business-trip-delete-modal/business-trip-delete-modal.component';

import * as $ from 'jquery';

@Component({
  selector: 'app-business-trip',
  templateUrl: './business-trip.component.html',
  styleUrls: ['./business-trip.component.scss']
})
export class BusinessTripComponent implements OnInit {

  displayedColumns = ['#', 'Full name', 'Employee ID', 'Subdivision', 'Start business trip', 'Finish business trip', 'Actions'];
  businessTrips: Observable<any[]>;
  page: number = 1;
  countItems: number = 20;
  searchString: string;

  constructor( public dialog: MatDialog, private businessTripService: BusinessTripService) {}

  ngOnInit() {
    this.businessTrips = this.businessTripService.businessTrips;
    this.businessTripService.getAll();
    console.log(this.businessTrips);
  }

  ngAfterViewChecked() {
    $(".top").css("width", $(".table").width());
  }

  resize(){
    $(".top").css("width", $(".table").width());
  }

  createBusinessTrip() {
    const dialogRef = this.dialog.open(BusinessTripAddModalComponent, {
      height: '450px',
      width: '400px',
    });
  }

  editBusinessTrip(businessTrip) {
    const dialogRefEdit = this.dialog.open(BusinessTripEditModalComponent, {
      height: '300px',
      width: '400px',
      data: {
        businessTrip: businessTrip
      }
    })
  }

  deleteBusinessTrip(businessTrip){
    const dialogRefDelete = this.dialog.open(BusinessTripDeleteModalComponent, {
      height: '150px',
      width: '250px',
      data: {
        businessTrip: businessTrip
      }
    });
  }
}
