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

  displayedColumns = ['#', 'Full name', 'Employee ID', 'Subdivision', 'Start disease', 'Finish disease', 'Disease', 'Actions'];
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

  editSickLeave(sickLeave) {
    const dialogRefEdit = this.dialog.open(SickLeaveEditModalComponent, {
      height: '550px',
      width: '400px',
      data: {
        sickLeave: sickLeave
      }
    })
  }

  deleteSickLeave(sickLeave){
    this.sickLeaveService.delete(sickLeave);
  }
}
