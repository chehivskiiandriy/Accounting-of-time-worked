import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { MatDialog } from '@angular/material';

import { SickLeaveService } from './../../_services/sick-leave.service';

import { SickLeaveAddModalComponent } from './sick-leave-add-modal/sick-leave-add-modal.component';
import { SickLeaveEditModalComponent } from './sick-leave-edit-modal/sick-leave-edit-modal.component';

@Component({
  selector: 'app-sick-leave',
  templateUrl: './sick-leave.component.html',
  styleUrls: ['./sick-leave.component.scss']
})
export class SickLeaveComponent implements OnInit {

  displayedColumns = ['№', 'fullname', 'employeeID', 'subdivision', 'startDisease', 'finishDisease', 'disease', 'actions'];
  sickLeaves: Observable<any[]>;

  constructor( public dialog: MatDialog, private sickLeaveService: SickLeaveService) {}

  ngOnInit() {
    this.sickLeaves = this.sickLeaveService.sickLeaves;
    console.log(this.sickLeaves);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(SickLeaveAddModalComponent, {
      height: '550px',
      width: '400px',
    });
  }

  deleteSickLeave(sickLeave){
    this.sickLeaveService.delete(sickLeave);
  }
}
