import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { MatDialog } from '@angular/material';

import { EmployeesService } from './../../_services/employees.service';

import { EmployeesAddModalComponent } from './employees-add-modal/employees-add-modal.component';
import { EmployeesEditModalComponent } from './employees-edit-modal/employees-edit-modal.component';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {

  displayedColumns = ['#', 'Surname', 'Name', 'Patronymic', 'Birthday', 'Subdivision', 'Actions'];
  // employees: Observable<any[]>;
  employees;
  p: number = 1;

  constructor( public dialog: MatDialog, private employeesService: EmployeesService) {}

  ngOnInit() {
    this.employees = this.employeesService.employees;
    this.employeesService.getAll();
    console.log(this.employees);
  }

  createEmployee(): void {
    const dialogRef = this.dialog.open(EmployeesAddModalComponent, {
      height: '550px',
      width: '400px',
    });
  }

  editEmployee(employee) {
    const dialogRefEdit = this.dialog.open(EmployeesEditModalComponent, {
      height: '550px',
      width: '400px',
      data: {
        employee: employee
      }
    })
  }

  deleteEmployee(employees){
    this.employeesService.delete(employees);
  }

}
