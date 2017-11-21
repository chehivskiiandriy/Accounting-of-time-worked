import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Observable } from 'rxjs/Observable';

import { SubdivisionService } from './../../../_services/subdivision.service';
import { EmployeesService } from './../../../_services/employees.service';
import { SickLeaveService } from './../../../_services/sick-leave.service';
import { CheckDataService } from './../../../_services/check-data.service';

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
    private sickLeaveService: SickLeaveService,
    private checkDataService: CheckDataService
  ) { }

  ngOnInit() {
    this.sickLeave.disease = '';
    
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

    this.fullName = this.selectedEmployee.surname + ' ' + this.selectedEmployee.name + ' ' + this.selectedEmployee.patronymic;
    this.subdivision = this.selectedEmployee.subdivision;

    console.log(this.sickLeave);
    console.log(this.selectedEmployee);

    console.log(typeof this.sickLeave.startDisease);
    
    let check = false;
    check = this.checkDataService.check(this.sickLeave.employeeID, this.sickLeave.startDisease, this.sickLeave.finishDisease);
    console.log(check);

    if(check) {
      this.sickLeave.startDisease = this.checkDataService.startDate;
      this.sickLeave.finishDisease = this.checkDataService.finishDate;

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
