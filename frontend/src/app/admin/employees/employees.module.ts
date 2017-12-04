import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { SharedModule } from './../../shared/shared.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { EmployeesComponent } from './employees.component';
import { EmployeesAddModalComponent } from './employees-add-modal/employees-add-modal.component';
import { EmployeesEditModalComponent } from './employees-edit-modal/employees-edit-modal.component';
import { EmployeesDeleteModalComponent } from './employees-delete-modal/employees-delete-modal.component';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        NgxPaginationModule
    ],
    declarations: [
        EmployeesComponent,
        EmployeesAddModalComponent,
        EmployeesEditModalComponent,
        EmployeesDeleteModalComponent
    ],
    entryComponents: [
        EmployeesAddModalComponent,
        EmployeesEditModalComponent,
        EmployeesDeleteModalComponent
      ],
    providers: [
    ]
})
export class EmployeesModule { }