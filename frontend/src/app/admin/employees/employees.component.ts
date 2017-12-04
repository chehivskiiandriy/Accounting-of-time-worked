import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { MatDialog, Sort } from '@angular/material';

import { EmployeesService } from './../../_services/employees.service';

import { EmployeesAddModalComponent } from './employees-add-modal/employees-add-modal.component';
import { EmployeesEditModalComponent } from './employees-edit-modal/employees-edit-modal.component';
import { EmployeesDeleteModalComponent } from './employees-delete-modal/employees-delete-modal.component';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {

  displayedColumns = ['#', 'Surname', 'Name', 'Patronymic', 'Birthday', 'Subdivision', 'Actions'];
  employees: Observable<any[]>;
  page: number = 1;
  countItems: number = 20;
  searchString: string;

  constructor( public dialog: MatDialog, private employeesService: EmployeesService) {}

  ngOnInit() {
    this.employees = this.employeesService.employees;
    this.employeesService.getAll();
    
    console.log(this.employees);
  }

  createEmployee(): void {
    const dialogRef = this.dialog.open(EmployeesAddModalComponent, {
      height: '500px',
      width: '400px',
    });
  }

  editEmployee(employee) {
    const dialogRefEdit = this.dialog.open(EmployeesEditModalComponent, {
      height: '500px',
      width: '400px',
      data: {
        employee: employee
      }
    });
  }

  deleteEmployee(employee){
    const dialogRefDelete = this.dialog.open(EmployeesDeleteModalComponent, {
      height: '200px',
      width: '400px',
      data: {
        employee: employee
      }
    });
  }

  sortData(sort: Sort) {
    const data = this.employeesService.employees;
    if (!sort.active || sort.direction == '') {
      this.employees = data;
      return;
    }

    this.employees = data.do(e => {
      e.sort((a, b) => {
        let isAsc = sort.direction == 'asc';
        switch (sort.active) {
          case 'surname': return compare(a.surname, b.surname, isAsc);
          case 'name': return compare(a.name, b.name, isAsc);
          case 'patronymic': return compare(a.patronymic, b.patronymic, isAsc);
          case 'birthday': return compare(a.birthday, b.birthday, isAsc);
          case 'subdivision': return compare(a.subdivision, b.subdivision, isAsc);
          default: return 0;
        }
      });
    }) 
  }

}

function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
