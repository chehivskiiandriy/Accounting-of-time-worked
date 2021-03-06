import { Component, OnInit, AfterViewChecked  } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { MatDialog } from '@angular/material';

import { HolidaysService } from './../../_services/holidays.service';

import { HolidaysAddModalComponent } from './holidays-add-modal/holidays-add-modal.component';
import { HolidaysEditModalComponent } from './holidays-edit-modal/holidays-edit-modal.component';
import { HolidaysDeleteModalComponent } from './holidays-delete-modal/holidays-delete-modal.component';

import * as $ from 'jquery';

@Component({
  selector: 'app-holidays',
  templateUrl: './holidays.component.html',
  styleUrls: ['./holidays.component.scss']
})
export class HolidaysComponent implements OnInit {

  displayedColumns = ['#', 'Full name', 'Employee ID', 'Subdivision', 'Start holiday', 'Finish holiday', 'Actions'];
  holidays: Observable<any[]>;
  page: number = 1;
  countItems: number = 20;
  searchString: string;

  constructor( public dialog: MatDialog, private holidaysService: HolidaysService) {}

  ngOnInit() {
    this.holidays = this.holidaysService.holidays;
    this.holidaysService.getAll();
    console.log(this.holidays);
  }

  ngAfterViewChecked() {
    $(".top").css("width", $(".table").width());
  }

  resize(){
    $(".top").css("width", $(".table").width());
  }

  createHoliday() {
    const dialogRef = this.dialog.open(HolidaysAddModalComponent, {
      height: '450px',
      width: '400px',
    });
  }

  editHoliday(holiday) {
    const dialogRefEdit = this.dialog.open(HolidaysEditModalComponent, {
      height: '300px',
      width: '400px',
      data: {
        holiday: holiday
      }
    })
  }

  deleteHoliday(holiday){
    const dialogRefDelete = this.dialog.open(HolidaysDeleteModalComponent, {
      height: '150px',
      width: '250px',
      data: {
        holiday: holiday
      }
    });
  }

}
