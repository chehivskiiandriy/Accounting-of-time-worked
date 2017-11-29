import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from '@angular/forms'

import { SharedModule } from './../../shared/shared.module';
import {NgxPaginationModule} from 'ngx-pagination';
import { EmployeesComponent } from './employees.component';
import { EmployeesAddModalComponent } from './employees-add-modal/employees-add-modal.component';
import { EmployeesEditModalComponent } from './employees-edit-modal/employees-edit-modal.component';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        FormsModule,
        NgxPaginationModule
    ],
    declarations: [
        EmployeesComponent,
        EmployeesAddModalComponent,
        EmployeesEditModalComponent
    ],
    entryComponents: [
        EmployeesAddModalComponent,
        EmployeesEditModalComponent
      ],
    providers: [
    ]
})
export class EmployeesModule { }