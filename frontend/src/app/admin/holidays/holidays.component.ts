import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { MatDialog } from '@angular/material';

import { HolidaysService } from './../../_services/holidays.service';

import { HolidaysAddModalComponent } from './holidays-add-modal/holidays-add-modal.component';
import { HolidaysEditModalComponent } from './holidays-edit-modal/holidays-edit-modal.component';

@Component({
  selector: 'app-holidays',
  templateUrl: './holidays.component.html',
  styleUrls: ['./holidays.component.scss']
})
export class HolidaysComponent implements OnInit {

  displayedColumns = ['#', 'Full name', 'Employee ID', 'Subdivision', 'Start holiday', 'Finish holiday', 'Actions'];
  holidays: Observable<any[]>;

  constructor( public dialog: MatDialog, private holidaysService: HolidaysService) {}

  ngOnInit() {
    this.holidays = this.holidaysService.holidays;
    console.log(this.holidays);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(HolidaysAddModalComponent, {
      height: '550px',
      width: '400px',
    });
  }

}
