import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Observable } from 'rxjs/Observable';

import { SubdivisionService } from './../../../_services/subdivision.service';
import { EmployeesService } from './../../../_services/employees.service';

import swal from 'sweetalert2';

import * as _moment from 'moment';
const moment = _moment;

@Component({
  selector: 'app-employees-add-modal',
  templateUrl: './employees-add-modal.component.html',
  styleUrls: ['./employees-add-modal.component.scss']
})
export class EmployeesAddModalComponent implements OnInit {

  employee: any = {};
  selectedSubdivision: any = {};
  subdivisions: Observable<any[]>;
  minDate;
  maxDate;

  constructor(
    public dialogRef: MatDialogRef<EmployeesAddModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private subdivisionService: SubdivisionService,
    private employeesService: EmployeesService
  ) { }

  ngOnInit() {
    this.employee.name = ""; 
    this.employee.surname = "";
    this.employee.patronymic = "";

    this.setMinAndMaxDate();    

    this.subdivisions = this.subdivisionService.subdivisions;
    this.subdivisionService.getAll();
  }
  
  setMinAndMaxDate() {
    let today = new Date();
    today.setFullYear(today.getFullYear() - 16);
    this.maxDate = moment(today);
    today.setFullYear(today.getFullYear() - 50);
    this.minDate = moment(today);
  }

  createEmployee() {
    this.employee.subdivisionID = this.selectedSubdivision.id;  
    this.employeesService.create(this.employee, this.selectedSubdivision.name);
    this.alert();
  }

  clearModal() {
    this.employee.name = "";
    this.employee.surname = "";
    this.employee.patronymic = "";
    this.employee.birthday = undefined;
    this.selectedSubdivision = {};
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
          this.clearModal();
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
