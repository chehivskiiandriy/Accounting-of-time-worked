import { Component } from '@angular/core';

import { SubdivisionService } from './_services/subdivision.service';
import { EmployeesService } from './_services/employees.service';
import { SickLeaveService } from './_services/sick-leave.service';
import { HolidaysService } from './_services/holidays.service';
import { BusinessTripService } from './_services/business-trip.service';
import { HookyService } from './_services/hooky.service';
import { WorkingDaysService } from './_services/working-days.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    private subdivisionService: SubdivisionService,
    private employeesService: EmployeesService,
    private sickLeaveService: SickLeaveService,
    private holidaysService: HolidaysService,
    private businessTripService: BusinessTripService,
    private hookyService: HookyService,
    private workingDaysService: WorkingDaysService
  ){}

  ngOnInit() {
    this.subdivisionService.getAll();
    this.employeesService.getAll();
    this.sickLeaveService.getAll();
    this.holidaysService.getAll();
    this.businessTripService.getAll();
    this.hookyService.getAll();
    this.workingDaysService.getAll();
  }
}
