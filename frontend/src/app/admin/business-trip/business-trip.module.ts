import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { SharedModule } from './../../shared/shared.module';
import { NgxPaginationModule } from 'ngx-pagination';

import { BusinessTripComponent } from './business-trip.component';
import { BusinessTripAddModalComponent } from './business-trip-add-modal/business-trip-add-modal.component';
import { BusinessTripEditModalComponent } from './business-trip-edit-modal/business-trip-edit-modal.component';
import { BusinessTripDeleteModalComponent } from './business-trip-delete-modal/business-trip-delete-modal.component';


@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        NgxPaginationModule
    ],
    declarations: [
        BusinessTripComponent,
        BusinessTripAddModalComponent,
        BusinessTripEditModalComponent,
        BusinessTripDeleteModalComponent
    ],
    entryComponents: [
        BusinessTripAddModalComponent,
        BusinessTripEditModalComponent,
        BusinessTripDeleteModalComponent
    ],
    providers: [
    ]
})
export class BusinessTripModule { }