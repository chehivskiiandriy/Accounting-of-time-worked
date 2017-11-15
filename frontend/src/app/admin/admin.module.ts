import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { SharedModule } from '../shared/shared.module';
import { AdminRoutingModule } from "./admin-routing.module";

import { AdminComponent } from "./admin.component";

import { SubdivisionModule } from './subdivision/subdivision.module';
import { EmployeesModule } from './employees/employees.module';
import { SickLeaveModule } from './sick-leave/sick-leave.module';
import { HolidaysModule } from './holidays/holidays.module';
import { BusinessTripModule } from './business-trip/business-trip.module';
import { HookyModule } from './hooky/hooky.module';
import { WorkingDaysModule } from './working-days/working-days.module';

@NgModule({
    imports: [
        CommonModule,
        AdminRoutingModule,
        SharedModule,
        SubdivisionModule,
        EmployeesModule,
        SickLeaveModule,
        HolidaysModule,
        BusinessTripModule,
        HookyModule,
        WorkingDaysModule       
    ],
    declarations: [
        AdminComponent
    ]
})
export class AdminModule { }