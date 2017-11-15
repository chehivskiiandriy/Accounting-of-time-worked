import { Component } from '@angular/core';

import { SubdivisionService } from './_services/subdivision.service';
import { EmployeesService } from './_services/employees.service';
import { SickLeaveService } from './_services/sick-leave.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    private subdivisionService: SubdivisionService,
    private employeesService: EmployeesService,
    private sickLeaveService: SickLeaveService
  ){}

  ngOnInit() {
    this.subdivisionService.getAll();
    this.employeesService.getAll();
    this.sickLeaveService.getAll();
  }
}
