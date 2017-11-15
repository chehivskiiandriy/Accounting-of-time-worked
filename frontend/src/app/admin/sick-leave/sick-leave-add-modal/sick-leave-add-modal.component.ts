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
  
  subdivisions: any;  
  employees: any;
  selectedSubdivision: any = {};
  selectedEmployee: any = {};
  sickLeave: any = {};

  fullName: string;
  subdivision: string;

  constructor(
    public dialogRef: MatDialogRef<SickLeaveAddModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private subdivisionService: SubdivisionService,
    private employeesService: EmployeesService,
    private sickLeaveService: SickLeaveService
  ) { }

  ngOnInit() {
    this.subdivisions = this.subdivisionService.getAllWithoutObservable();
    console.log(this.subdivisions);

    this.employees = this.employeesService.getAllWithoutObservable();
    console.log(this.employees);
  }

  onSelect(selected) {
    console.log(selected.id);
    this.employees = this.employeesService.getFiltered(selected.id);
  }


  createSickLeave() {
    this.sickLeave.employeeID = this.selectedEmployee.id;

    function pad(number) {
      if (number < 10) {
        return '0' + number;
      }
      return number;
    }
    
    this.sickLeave.startDisease = this.sickLeave.startDisease.getFullYear() + "-" + pad(this.sickLeave.startDisease.getMonth() + 1) + "-" + pad(this.sickLeave.startDisease.getDate());
    this.sickLeave.finishDisease = this.sickLeave.finishDisease.getFullYear() + "-" + pad(this.sickLeave.finishDisease.getMonth() + 1) + "-" + pad(this.sickLeave.finishDisease.getDate());
    
    this.fullName = this.selectedEmployee.surname + ' ' + this.selectedEmployee.name + ' ' + this.selectedEmployee.patronymic;
    this.subdivision = this.selectedEmployee.subdivision;

    console.log(this.sickLeave);
    console.log(this.selectedEmployee);
    console.log(this.selectedSubdivision);
    console.log(this.fullName);
    console.log(this.subdivision);
    
    if(this.sickLeave.employeeID != "" && this.sickLeave.disease != "" && this.sickLeave.startDisease != "" && this.sickLeave.finishDisease != "") {
      this.sickLeaveService.create(this.sickLeave, this.fullName, this.subdivision);

      this.sickLeave.employeeID = "";
      this.sickLeave.startDisease = "";
      this.sickLeave.finishDisease = "";
      this.sickLeave.disease = "";
      this.selectedSubdivision = {};
      this.selectedEmployee = {};
    }
  }

}
