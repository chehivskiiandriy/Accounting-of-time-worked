import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule} from '@angular/forms'

import { SharedModule } from './../../shared/shared.module';

import { SubdivisionComponent } from './subdivision.component';
import { SubdivisionAddModalComponent } from './subdivision-add-modal/subdivision-add-modal.component';
import { SubdivisionEditModalComponent } from './subdivision-edit-modal/subdivision-edit-modal.component';
import { SubdivisionDeleteModalComponent } from './subdivision-delete-modal/subdivision-delete-modal.component';

import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        NgxPaginationModule
    ],
    declarations: [
        SubdivisionComponent,
        SubdivisionAddModalComponent,
        SubdivisionEditModalComponent,
        SubdivisionDeleteModalComponent
    ],
    entryComponents: [
        SubdivisionAddModalComponent,
        SubdivisionEditModalComponent,
        SubdivisionDeleteModalComponent
      ],
    providers: [
        
    ]
})
export class SubdivisionModule { }