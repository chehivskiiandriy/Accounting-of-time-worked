import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { SharedModule } from './../../shared/shared.module';
import { NgxPaginationModule } from 'ngx-pagination';

import { HookyComponent } from './hooky.component';
import { HookyAddModalComponent } from './hooky-add-modal/hooky-add-modal.component';
import { HookyEditModalComponent } from './hooky-edit-modal/hooky-edit-modal.component';
import { HookyDeleteModalComponent } from './hooky-delete-modal/hooky-delete-modal.component';


@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        NgxPaginationModule
    ],
    declarations: [
        HookyComponent,
        HookyAddModalComponent,
        HookyEditModalComponent,
        HookyDeleteModalComponent
    ],
    entryComponents: [
        HookyAddModalComponent,
        HookyEditModalComponent,
        HookyDeleteModalComponent
    ],
    providers: [
    ]
})
export class HookyModule { }