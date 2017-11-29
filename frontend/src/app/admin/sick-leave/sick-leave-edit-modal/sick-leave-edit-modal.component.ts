import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Observable } from 'rxjs/Observable';

import { SickLeaveService } from './../../../_services/sick-leave.service';

import swal from 'sweetalert2';

import * as _moment from 'moment';
const moment = _moment;

@Component({
  selector: 'app-sick-leave-edit-modal',
  templateUrl: './sick-leave-edit-modal.component.html',
  styleUrls: ['./sick-leave-edit-modal.component.scss']
})
export class SickLeaveEditModalComponent implements OnInit {

  sickLeave: any = {};

  constructor(
    public dialogRef: MatDialogRef<SickLeaveEditModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private sickLeaveService: SickLeaveService
  ) { }
  
  ngOnInit() {
    console.log(this.data);
    
    this.sickLeave.fullName = this.data.sickLeave.fullName;
    this.sickLeave.employeeID = this.data.sickLeave.employeeID;
    this.sickLeave.subdivision = this.data.sickLeave.subdivision;
    this.sickLeave.startDisease = moment(this.data.sickLeave.startDisease);
    this.sickLeave.id = this.data.sickLeave.id;
    this.sickLeave.finishDisease = moment(this.data.sickLeave.finishDisease);
    this.sickLeave.disease = this.data.sickLeave.disease; 
  }

  editSickLeave() {
    this.sickLeaveService.update(this.sickLeave);
    this.alert();
  }  

  alert() {
    let s = setInterval(() => {
      if(this.sickLeaveService.success !== undefined){
        clearInterval(s);
        if(this.sickLeaveService.success){
          swal({
            title: 'Great!',
            text: 'Your work has been saved!',
            type: 'success',
            width: '300px',
            showConfirmButton: false,
            timer: 1500
          });
          setTimeout(() => this.dialogRef.close(), 1600);
          } else {
            swal({
              title: 'Oops...',
              text: 'Something went wrong!',
              type: 'error',
              width: '300px',
              showConfirmButton: false,
            });
            this.sickLeave.startDisease = moment(this.sickLeave.startDisease);
            this.sickLeave.finishDisease = moment(this.sickLeave.finishDisease);
          }
      }
    }, 50);

  }

}
