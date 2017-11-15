import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Observable } from 'rxjs/Observable';

import { SubdivisionService } from './../../../_services/subdivision.service';
import { EmployeesService } from './../../../_services/employees.service';

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

  constructor(
    public dialogRef: MatDialogRef<EmployeesEditModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private subdivisionService: SubdivisionService,
    private employeesService: EmployeesService
  ) { }
  
  ngOnInit() {
    console.log(this.data);
    
    this.employee.name = this.data.employee.name;
    this.employee.surname = this.data.employee.surname;
    this.employee.patronymic = this.data.employee.patronymic;
    this.employee.birthday = this.data.employee.birthday;
    this.employee.id = this.data.employee.id;
    this.employee.subdivision = this.data.employee.subdivision;
    this.employee.subdivisionID = this.data.employee.subdivisionID;

    this.selectedSubdivision = this.data.employee.subdivisionID;
    console.log(this.selectedSubdivision);

    this.subdivisions = this.subdivisionService.subdivisions;
    // this.subdivisionService.getAll();    
    
  }

  editEmployee() {
    this.employee.subdivisionID = this.selectedSubdivision;
    console.log(this.employee);
    this.name = this.subdivisionService.getSub(this.selectedSubdivision);

    function pad(number) {
      if (number < 10) {
        return '0' + number;
      }
      return number;
    }

    this.employee.birthday = this.employee.birthday.getFullYear() + "-" + pad(this.employee.birthday.getMonth() + 1) + "-" + pad(this.employee.birthday.getDate());
    console.log(this.employee.birthday);

    console.log(this.name);
    if(this.name != "" && this.employee.name != "" && this.employee.surname != "" && this.employee.patronymic != "" && this.employee.birthday != "" ) {
      this.employeesService.update(this.employee, this.name);
      this.dialogRef.close();
    }
  }

}
