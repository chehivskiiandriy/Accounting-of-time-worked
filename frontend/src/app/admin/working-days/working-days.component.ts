import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { MatDialog } from '@angular/material';

import { WorkingDaysService } from './../../_services/working-days.service';

import { WorkingDaysAddModalComponent } from './working-days-add-modal/working-days-add-modal.component';
import { WorkingDaysEditModalComponent } from './working-days-edit-modal/working-days-edit-modal.component';

@Component({
  selector: 'app-working-days',
  templateUrl: './working-days.component.html',
  styleUrls: ['./working-days.component.scss']
})
export class WorkingDaysComponent implements OnInit {

  displayedColumns = ['#', 'Full name', 'Employee ID', 'Subdivision', 'Amount days', 'Year', 'Month', 'Actions'];
  workingDays: Observable<any[]>;

  constructor( public dialog: MatDialog, private workingDaysService: WorkingDaysService) {}

  ngOnInit() {
    this.workingDays = this.workingDaysService.workingDays;
    console.log(this.workingDays);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(WorkingDaysAddModalComponent, {
      height: '550px',
      width: '400px',
    });
  }

}
