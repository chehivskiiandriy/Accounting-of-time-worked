import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { MatDialog } from '@angular/material';

import { SickLeaveService } from './../../_services/sick-leave.service';

import { SickLeaveAddModalComponent } from './sick-leave-add-modal/sick-leave-add-modal.component';
import { SickLeaveEditModalComponent } from './sick-leave-edit-modal/sick-leave-edit-modal.component';
import { SickLeaveDeleteModalComponent } from './sick-leave-delete-modal/sick-leave-delete-modal.component';

@Component({
  selector: 'app-sick-leave',
  templateUrl: './sick-leave.component.html',
  styleUrls: ['./sick-leave.component.scss']
})
export class SickLeaveComponent implements OnInit {

  displayedColumns = ['#', 'Full name', 'Employee ID', 'Subdivision', 'Start disease', 'Finish disease', 'Disease', 'Actions'];
  sickLeaves: Observable<any[]>;
  page: number = 1;
  countItems: number = 20;
  searchString: string;

  constructor( public dialog: MatDialog, private sickLeaveService: SickLeaveService) {}

  ngOnInit() {
    this.sickLeaves = this.sickLeaveService.sickLeaves;
    this.sickLeaveService.getAll();
    console.log(this.sickLeaves);
  }

  createSickLeave(): void {
    const dialogRef = this.dialog.open(SickLeaveAddModalComponent, {
      height: '500px',
      width: '400px',
    });
  }

  editSickLeave(sickLeave) {
    const dialogRefEdit = this.dialog.open(SickLeaveEditModalComponent, {
      height: '350px',
      width: '400px',
      data: {
        sickLeave: sickLeave
      }
    })
  }

  deleteSickLeave(sickLeave){
    const dialogRefDelete = this.dialog.open(SickLeaveDeleteModalComponent, {
      height: '200px',
      width: '400px',
      data: {
        sickLeave: sickLeave
      }
    });
  }

}
