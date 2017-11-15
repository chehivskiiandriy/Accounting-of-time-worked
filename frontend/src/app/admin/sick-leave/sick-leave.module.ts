import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from '@angular/forms'

import { SharedModule } from './../../shared/shared.module';

import { SickLeaveComponent } from './sick-leave.component';
import { SickLeaveAddModalComponent } from './sick-leave-add-modal/sick-leave-add-modal.component';
import { SickLeaveEditModalComponent } from './sick-leave-edit-modal/sick-leave-edit-modal.component';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        FormsModule
    ],
    declarations: [
        SickLeaveComponent,
        SickLeaveAddModalComponent,
        SickLeaveEditModalComponent
    ],
    entryComponents: [
        SickLeaveAddModalComponent,
        SickLeaveEditModalComponent
      ],
    providers: [
    ]
})
export class SickLeaveModule { }