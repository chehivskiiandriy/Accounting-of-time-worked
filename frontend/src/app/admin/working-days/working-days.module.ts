import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from '@angular/forms'

import { SharedModule } from './../../shared/shared.module';

import { WorkingDaysComponent } from './working-days.component';
import { WorkingDaysAddModalComponent } from './working-days-add-modal/working-days-add-modal.component';
import { WorkingDaysEditModalComponent } from './working-days-edit-modal/working-days-edit-modal.component';
import { WorkingDaysDeleteModalComponent } from './working-days-delete-modal/working-days-delete-modal.component';


@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        FormsModule
    ],
    declarations: [
        WorkingDaysComponent,
        WorkingDaysAddModalComponent,
        WorkingDaysEditModalComponent,
        WorkingDaysDeleteModalComponent
    ],
    entryComponents: [
        WorkingDaysAddModalComponent,
        WorkingDaysEditModalComponent
    ],
    providers: [
    ]
})
export class WorkingDaysModule { }