import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { SharedModule } from './../../shared/shared.module';
import { NgxPaginationModule } from 'ngx-pagination';

import { SickLeaveComponent } from './sick-leave.component';
import { SickLeaveAddModalComponent } from './sick-leave-add-modal/sick-leave-add-modal.component';
import { SickLeaveEditModalComponent } from './sick-leave-edit-modal/sick-leave-edit-modal.component';
import { SickLeaveDeleteModalComponent } from './sick-leave-delete-modal/sick-leave-delete-modal.component';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        NgxPaginationModule
    ],
    declarations: [
        SickLeaveComponent,
        SickLeaveAddModalComponent,
        SickLeaveEditModalComponent,
        SickLeaveDeleteModalComponent
    ],
    entryComponents: [
        SickLeaveAddModalComponent,
        SickLeaveEditModalComponent,
        SickLeaveDeleteModalComponent
      ],
    providers: [
    ]
})
export class SickLeaveModule { }