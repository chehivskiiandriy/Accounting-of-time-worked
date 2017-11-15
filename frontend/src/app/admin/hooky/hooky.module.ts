import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from '@angular/forms'

import { SharedModule } from './../../shared/shared.module';

import { HookyComponent } from './hooky.component';
import { HookyAddModalComponent } from './hooky-add-modal/hooky-add-modal.component';
import { HookyEditModalComponent } from './hooky-edit-modal/hooky-edit-modal.component';


@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        FormsModule
    ],
    declarations: [
        HookyComponent,
        HookyAddModalComponent,
        HookyEditModalComponent
    ],
    entryComponents: [
        HookyAddModalComponent,
        HookyEditModalComponent
    ],
    providers: [
    ]
})
export class HookyModule { }