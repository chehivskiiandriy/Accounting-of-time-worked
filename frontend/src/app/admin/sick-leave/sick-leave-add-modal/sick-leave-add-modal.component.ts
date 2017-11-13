import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Observable } from 'rxjs/Observable';

import { SubdivisionService } from './../../../_services/subdivision.service';
import { EmployeesService } from './../../../_services/employees.service';
import { SickLeaveService } from './../../../_services/sick-leave.service';

@Component({
  selector: 'app-sick-leave-add-modal',
  templateUrl: './sick-leave-add-modal.component.html',
  styleUrls: ['./sick-leave-add-modal.component.scss']
})
export class SickLeaveAddModalComponent implements OnInit {
  
  subdivisions: Observable<any[]>;  
  employees: Observable<any[]>;
  selectedSubdivision: any = {};
  selectedEmployeeID: any;
  sickLeave: any = {};

  constructor(
    public dialogRef: MatDialogRef<SickLeaveAddModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private subdivisionService: SubdivisionService,
    private employeesService: EmployeesService,
    private sickLeaveService: SickLeaveService
  ) { }

  ngOnInit() {
    this.subdivisions = this.subdivisionService.subdivisions;
    this.subdivisionService.getAll();
    console.log(this.subdivisions);

    this.employees = this.employeesService.employees;
    this.employeesService.getAll();
    console.log(this.employees);

  }



  createSickLeave() {
    // this.employee.subdivisionID = this.selectedSubdivision.id;  
    // console.log(this.selectedSubdivision.id);
    // console.log(this.selectedSubdivision.name);  
    // if(this.selectedSubdivision.name != "" && this.employee.name != "" && this.employee.surname != "" && this.employee.patronymic != "" && this.employee.age > 0) {
    //   this.employeesService.create(this.employee, this.selectedSubdivision.name);

    //   this.employee.name = "";
    //   this.employee.surname = "";
    //   this.employee.patronymic = "";
    //   this.employee.age = null;
    //   this.selectedSubdivision = {};
    // }
  }

}
