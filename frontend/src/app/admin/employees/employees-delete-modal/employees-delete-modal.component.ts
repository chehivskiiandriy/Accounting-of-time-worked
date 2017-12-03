import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { EmployeesService } from './../../../_services/employees.service';

import { Alert } from './../../../shared/alert';

@Component({
  selector: 'app-employees-delete-modal',
  templateUrl: './employees-delete-modal.component.html',
  styleUrls: ['./employees-delete-modal.component.scss']
})
export class EmployeesDeleteModalComponent implements OnInit {

  employee: any = {};
  alertModal: Alert = new Alert();

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
          this.alertModal.success();
          setTimeout(() => this.dialogRef.close(), 1600);
          } else {
            this.alertModal.error();
          }
      }
    }, 50);

  }
}
