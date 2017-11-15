import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from '@angular/forms'

import { SharedModule } from './../../shared/shared.module';

import { BusinessTripComponent } from './business-trip.component';
import { BusinessTripAddModalComponent } from './business-trip-add-modal/business-trip-add-modal.component';
import { BusinessTripEditModalComponent } from './business-trip-edit-modal/business-trip-edit-modal.component';


@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        FormsModule
    ],
    declarations: [
        BusinessTripComponent,
        BusinessTripAddModalComponent,
        BusinessTripEditModalComponent
    ],
    entryComponents: [
        BusinessTripAddModalComponent,
        BusinessTripEditModalComponent
    ],
    providers: [
    ]
})
export class BusinessTripModule { }