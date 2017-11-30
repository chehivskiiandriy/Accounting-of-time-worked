import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { EmployeesService } from './../../../_services/employees.service';

import swal from 'sweetalert2';

@Component({
  selector: 'app-employees-delete-modal',
  templateUrl: './employees-delete-modal.component.html',
  styleUrls: ['./employees-delete-modal.component.scss']
})
export class EmployeesDeleteModalComponent implements OnInit {

  employee: any = {};
  
  constructor(public dialogRef: MatDialogRef<EmployeesDeleteModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private employeesService: EmployeesService) { }

  ngOnInit() {
    this.employee = this.data.employee;
  }

  deleteEmployee() {
    this.employeesService.delete(this.employee);
    this.alert();
  }

  alert() {
    let s = setInterval(() => {
      if(this.employeesService.success !== undefined){
        clearInterval(s);
        if(this.employeesService.success){
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
          }
      }
    }, 50);

  }
}
