import { Component, OnInit, AfterViewChecked  } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { EmployeesService } from './../../_services/employees.service';

import * as $ from 'jquery';

@Component({
  selector: 'app-emplo-sub',
  templateUrl: './emplo-sub.component.html',
  styleUrls: ['./emplo-sub.component.scss']
})
export class EmploSubComponent implements OnInit {

  displayedColumns = ['#', 'Subdivision', 'Full name', 'Birthday'];
  employees: Observable<any[]>;
  page: number = 1;
  countItems: number = 20;
  searchString: string;

  constructor(private employeesService: EmployeesService) {}

  ngOnInit() {
    this.employees = this.employeesService.employees;
    this.employeesService.getAll();

    this.employees = this.employees.do(e => {
      e.sort((a, b) => {
        return this.compare(a.subdivision, b.subdivision);
      });
    });

    console.log(this.employees);
  }

  ngAfterViewChecked() {
    $(".top").css("width", $(".table").width());
  }
  
  resize(){
    $(".top").css("width", $(".table").width());
  }

  compare(a, b) {
    return (a < b ? -1 : 1);
  }
}