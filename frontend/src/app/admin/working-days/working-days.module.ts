import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { SharedModule } from './../../shared/shared.module';
import { NgxPaginationModule } from 'ngx-pagination';

import { WorkingDaysComponent } from './working-days.component';
import { WorkingDaysAddModalComponent } from './working-days-add-modal/working-days-add-modal.component';
import { WorkingDaysEditModalComponent } from './working-days-edit-modal/working-days-edit-modal.component';
import { WorkingDaysDeleteModalComponent } from './working-days-delete-modal/working-days-delete-modal.component';


@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        NgxPaginationModule
    ],
    declarations: [
        WorkingDaysComponent,
        WorkingDaysAddModalComponent,
        WorkingDaysEditModalComponent,
        WorkingDaysDeleteModalComponent
    ],
    entryComponents: [
        WorkingDaysAddModalComponent,
        WorkingDaysEditModalComponent,
        WorkingDaysDeleteModalComponent
    ],
    providers: [
    ]
})
export class WorkingDaysModule { }