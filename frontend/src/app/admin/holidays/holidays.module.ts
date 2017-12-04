import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { SharedModule } from './../../shared/shared.module';
import { NgxPaginationModule } from 'ngx-pagination';

import { HolidaysComponent } from './holidays.component';
import { HolidaysAddModalComponent } from './holidays-add-modal/holidays-add-modal.component';
import { HolidaysEditModalComponent } from './holidays-edit-modal/holidays-edit-modal.component';
import { HolidaysDeleteModalComponent } from './holidays-delete-modal/holidays-delete-modal.component';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        NgxPaginationModule
    ],
    declarations: [
        HolidaysComponent,
        HolidaysAddModalComponent,
        HolidaysEditModalComponent,
        HolidaysDeleteModalComponent
    ],
    entryComponents: [
        HolidaysAddModalComponent,
        HolidaysEditModalComponent,
        HolidaysDeleteModalComponent
      ],
    providers: [
    ]
})
export class HolidaysModule { }