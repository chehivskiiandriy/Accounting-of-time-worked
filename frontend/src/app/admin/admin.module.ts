import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { SharedModule } from '../shared/shared.module';
import { AdminRoutingModule } from "./admin-routing.module";

import { AdminComponent } from "./admin.component";

import { SubdivisionModule } from './subdivision/subdivision.module';
import { EmployeesModule } from './employees/employees.module';

@NgModule({
    imports: [
        CommonModule,
        AdminRoutingModule,
        SharedModule,
        SubdivisionModule,
        EmployeesModule
    ],
    declarations: [
        AdminComponent,
    ]
})
export class AdminModule { }