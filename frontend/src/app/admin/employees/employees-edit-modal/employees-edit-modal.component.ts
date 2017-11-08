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
    this.employee = this.data.employee;

    this.selectedSubdivision = this.data.employee.subdivisionID;
    console.log(this.selectedSubdivision);

    this.subdivisions = this.subdivisionService.subdivisions;
    this.subdivisionService.getAll();    
    
  }

  editEmployee() {
    this.employee.subdivisionID = this.selectedSubdivision;
    console.log(this.employee);
    this.name = this.subdivisionService.getSub(this.selectedSubdivision);
    console.log(this.name);
    if(this.employee.name != "") {
      this.employeesService.update(this.employee, this.name);
      this.dialogRef.close();
    }
  }

}
