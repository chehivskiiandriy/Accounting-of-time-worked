import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from '@angular/forms'

import { SharedModule } from '../shared/shared.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { HomeRoutingModule } from "./home-routing.module";

import { HomeComponent } from "./home.component";
import { ReportComponent } from './report/report.component';
import { EmploSubComponent } from './emplo-sub/emplo-sub.component';

import { ReportService } from './../_services/report.service';

import { BusinessTripFilterPipe } from './../_pipes/filter.pipe';
import { HolidaysFilterPipe } from './../_pipes/filter.pipe';
import { HookyFilterPipe } from './../_pipes/filter.pipe';
import { SickLeaveFilterPipe } from './../_pipes/filter.pipe';
import { WorkingDaysFilterPipe } from './../_pipes/filter.pipe';

@NgModule({
    imports: [
        CommonModule,
        HomeRoutingModule,
        SharedModule,
        FormsModule,
        NgxPaginationModule
    ],
    declarations: [
        HomeComponent,
        ReportComponent,
        EmploSubComponent,
        BusinessTripFilterPipe,
        HolidaysFilterPipe,
        HookyFilterPipe,
        SickLeaveFilterPipe,
        WorkingDaysFilterPipe
    ],
    providers: [
        ReportService
    ]
})
export class HomeModule { }