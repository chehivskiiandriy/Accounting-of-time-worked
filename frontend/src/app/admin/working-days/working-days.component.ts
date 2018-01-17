import { Component, OnInit, AfterViewChecked  } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { MatDialog } from '@angular/material';

import { WorkingDaysService } from './../../_services/working-days.service';

import { WorkingDaysAddModalComponent } from './working-days-add-modal/working-days-add-modal.component';
import { WorkingDaysEditModalComponent } from './working-days-edit-modal/working-days-edit-modal.component';
import { WorkingDaysDeleteModalComponent } from './working-days-delete-modal/working-days-delete-modal.component';

import * as $ from 'jquery';

@Component({
  selector: 'app-working-days',
  templateUrl: './working-days.component.html',
  styleUrls: ['./working-days.component.scss']
})
export class WorkingDaysComponent implements OnInit {

  displayedColumns = ['#', 'Full name', 'Employee ID', 'Subdivision', 'Amount days', 'Year', 'Month', 'Actions'];
  workingDays: Observable<any[]>;
  page: number = 1;
  countItems: number = 20;
  searchString: string;

  constructor( public dialog: MatDialog, private workingDaysService: WorkingDaysService) {}

  ngOnInit() {
    this.workingDays = this.workingDaysService.workingDays;
    this.workingDaysService.getAll();
    console.log(this.workingDays);
  }

  ngAfterViewChecked() {
    $(".top").css("width", $(".table").width());
  }
  
  resize(){
    $(".top").css("width", $(".table").width());
  }

  createWorkingsDays() {
    const dialogRef = this.dialog.open(WorkingDaysAddModalComponent, {
      height: '500px',
      width: '400px',
    });
  }

  editWorkingDays(workingDay) {
    const dialogRefEdit = this.dialog.open(WorkingDaysEditModalComponent, {
      height: '250px',
      width: '400px',
      data: {
        workingDay: workingDay
      }
    })
  }

  deleteWorkingDays(workingDay){
    const dialogRefDelete = this.dialog.open(WorkingDaysDeleteModalComponent, {
      height: '150px',
      width: '250px',
      data: {
        workingDay: workingDay
      }
    });
  }

}
