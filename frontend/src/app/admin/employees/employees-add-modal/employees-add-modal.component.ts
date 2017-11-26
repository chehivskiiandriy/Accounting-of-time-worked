import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Observable } from 'rxjs/Observable';

import { SubdivisionService } from './../../../_services/subdivision.service';
import { EmployeesService } from './../../../_services/employees.service';

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
  minDate = moment("1940-01-01");
  maxDate = moment("2002-01-01");

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

    this.subdivisions = this.subdivisionService.subdivisions;
    console.log(this.subdivisions);
  }
  
  createEmployee() {
    this.employee.subdivisionID = this.selectedSubdivision.id;  

    function pad(number) {
      if (number < 10) {
        return '0' + number;
      }
      return number;
    }

    console.log(this.employee.birthday);      
    this.employee.birthday = this.employee.birthday._d.getFullYear() + "-" + pad(this.employee.birthday._d.getMonth() + 1) + "-" + pad(this.employee.birthday._d.getDate());
    console.log(this.employee.birthday);
    console.log(this.employee);
    
    this.employeesService.create(this.employee, this.selectedSubdivision.name);

    this.employee.name = "";
    this.employee.surname = "";
    this.employee.patronymic = "";
    this.employee.birthday = undefined;
    this.selectedSubdivision = {};
  
  }

}
