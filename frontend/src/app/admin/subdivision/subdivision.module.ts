import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule} from '@angular/forms'


import { SharedModule } from './../../shared/shared.module';

import { SubdivisionComponent } from './subdivision.component';
import { SubdivisionAddModalComponent } from './subdivision-add-modal/subdivision-add-modal.component';
import { SubdivisionEditModalComponent } from './subdivision-edit-modal/subdivision-edit-modal.component';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        FormsModule
    ],
    declarations: [
        SubdivisionComponent,
        SubdivisionAddModalComponent,
        SubdivisionEditModalComponent
    ],
    entryComponents: [
        SubdivisionAddModalComponent,
        SubdivisionEditModalComponent
      ],
    providers: [
        
    ]
})
export class SubdivisionModule { }