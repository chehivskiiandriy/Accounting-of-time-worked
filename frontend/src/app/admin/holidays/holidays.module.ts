import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from '@angular/forms'

import { SharedModule } from './../../shared/shared.module';

import { HolidaysComponent } from './holidays.component';
import { HolidaysAddModalComponent } from './holidays-add-modal/holidays-add-modal.component';
import { HolidaysEditModalComponent } from './holidays-edit-modal/holidays-edit-modal.component';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        FormsModule
    ],
    declarations: [
        HolidaysComponent,
        HolidaysAddModalComponent,
        HolidaysEditModalComponent
    ],
    entryComponents: [
        HolidaysAddModalComponent,
        HolidaysEditModalComponent
      ],
    providers: [
    ]
})
export class HolidaysModule { }