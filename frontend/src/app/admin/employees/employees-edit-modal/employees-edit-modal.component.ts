import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Observable } from 'rxjs/Observable';

import { SubdivisionService } from './../../../_services/subdivision.service';
import { EmployeesService } from './../../../_services/employees.service';

import swal from 'sweetalert2';

import * as _moment from 'moment';
const moment = _moment;

@Component({
  selector: 'app-employees-edit-modal',
  templateUrl: './employees-edit-modal.component.html',
  styleUrls: ['./employees-edit-modal.component.scss']
})
export class EmployeesEditModalComponent implements OnInit {

  employee: any = {};
  selectedSubdivision: any;
  subdivisions: Observable<any[]>;
  name: any;

  minDate;
  maxDate;

  constructor(
    public dialogRef: MatDialogRef<EmployeesEditModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private subdivisionService: SubdivisionService,
    private employeesService: EmployeesService
  ) { }
  
  ngOnInit() {
    console.log(this.data);
    
    this.getEmployeeData();

    this.setMinAndMaxDate();  

    this.subdivisions = this.subdivisionService.subdivisions;
    this.subdivisionService.getAll();
  }

  getEmployeeData() {
    this.employee.name = this.data.employee.name;
    this.employee.surname = this.data.employee.surname;
    this.employee.patronymic = this.data.employee.patronymic;
    this.employee.birthday = moment(this.data.employee.birthday);
    this.employee.id = this.data.employee.id;
    this.employee.subdivision = this.data.employee.subdivision;

    this.selectedSubdivision = this.data.employee.subdivisionID;
  }

  setMinAndMaxDate() {
    let today = new Date();
    today.setFullYear(today.getFullYear() - 16);
    this.maxDate = moment(today);
    today.setFullYear(today.getFullYear() - 50);
    this.minDate = moment(today);
  }

  editEmployee() {
    this.employee.subdivisionID = this.selectedSubdivision;
    this.name = this.subdivisionService.getSub(this.selectedSubdivision);
    this.employeesService.update(this.employee, this.name);
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
            this.employee.birthday = moment(this.employee.birthday);
          }
      }
    }, 50);

  }
  
}
