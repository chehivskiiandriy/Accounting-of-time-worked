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
    this.subdivisions = this.subdivisionService.subdivisions;
    this.subdivisionService.getAll();
    console.log(this.subdivisions);
    this.employee.name = "";
  }

  createEmployee() {
    this.employee.subdivisionID = this.selectedSubdivision.id;  
    console.log(this.selectedSubdivision.id);
    console.log(this.selectedSubdivision.name);  
    if(this.employee.name != "") {
      this.employeesService.create(this.employee, this.selectedSubdivision.name);
    }
    this.employee.name = "";
  }

}
