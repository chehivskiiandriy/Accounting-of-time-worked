import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Observable } from 'rxjs/Observable';

import swal from 'sweetalert2';

import { SubdivisionService } from './../../../_services/subdivision.service';
import { EmployeesService } from './../../../_services/employees.service';
import { SickLeaveService } from './../../../_services/sick-leave.service';

import * as _moment from 'moment';
const moment = _moment;

@Component({
  selector: 'app-sick-leave-add-modal',
  templateUrl: './sick-leave-add-modal.component.html',
  styleUrls: ['./sick-leave-add-modal.component.scss']
})
export class SickLeaveAddModalComponent implements OnInit {
    
  subdivisions: Observable<any[]>;  
  employees: Observable<any[]>;
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
    this.sickLeave.disease = '';
    
    this.subdivisions = this.subdivisionService.subdivisions;
    this.subdivisionService.getAll();
    console.log(this.subdivisions);

    this.employees = this.employeesService.employees;
    this.employeesService.getAll();
    console.log(this.employees);
  }

  onSelect(selected) {
    console.log(selected.id);
    this.employees = this.employeesService.employees.map(e => e.filter((t) => t.subdivisionID === selected.id));
    this.selectedEmployee = {};
  }

  createSickLeave() {
    this.sickLeave.employeeID = this.selectedEmployee.id;

    this.fullName = this.selectedEmployee.surname + ' ' + this.selectedEmployee.name + ' ' + this.selectedEmployee.patronymic;
    this.subdivision = this.selectedEmployee.subdivision;

    console.log(this.sickLeave);
    console.log(this.selectedEmployee);

    this.sickLeaveService.create(this.sickLeave, this.fullName, this.subdivision);
    this.alert();
  }

  alert() {
    let s = setInterval(() => {
      if(this.sickLeaveService.success !== undefined){
        clearInterval(s);
        if(this.sickLeaveService.success){
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
              showConfirmButton: false
            });
            this.sickLeave.startDisease = moment(this.sickLeave.startDisease);
            this.sickLeave.finishDisease = moment(this.sickLeave.finishDisease);
          }
      }
    }, 50);

  }
  
  clearModal() {
    this.sickLeave.employeeID = "";
    this.sickLeave.startDisease = "";
    this.sickLeave.finishDisease = "";
    this.sickLeave.disease = "";
    this.selectedSubdivision = {};
    this.selectedEmployee = {};
  }
}
