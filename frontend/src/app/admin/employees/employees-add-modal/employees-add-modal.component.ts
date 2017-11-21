import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Observable } from 'rxjs/Observable';

import { SubdivisionService } from './../../../_services/subdivision.service';
import { EmployeesService } from './../../../_services/employees.service';

@Component({
  selector: 'app-employees-add-modal',
  templateUrl: './employees-add-modal.component.html',
  styleUrls: ['./employees-add-modal.component.scss']
})
export class EmployeesAddModalComponent implements OnInit {

  employee: any = {};
  selectedSubdivision: any = {};
  subdivisions: Observable<any[]>;

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

    if((this.employee.birthday.getFullYear()+"").length == 4) {
      
      console.log(this.employee.birthday);      
      this.employee.birthday = this.employee.birthday.getFullYear() + "-" + pad(this.employee.birthday.getMonth() + 1) + "-" + pad(this.employee.birthday.getDate());
      console.log(this.employee.birthday);

      this.employeesService.create(this.employee, this.selectedSubdivision.name);

      this.employee.name = "";
      this.employee.surname = "";
      this.employee.patronymic = "";
      this.employee.birthday = "";
      this.selectedSubdivision = {};
    }
  }

}
