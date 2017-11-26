import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { HttpModule } from '@angular/http';
import { SharedModule } from './shared/shared.module';
// import { MAT_DATE_LOCALE } from '@angular/material';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

import {MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';

import { HomeModule } from "./home/home.module";
import { AdminModule } from "./admin/admin.module";
import { LoginRoutingModule } from "./login/login-routing.module";

import { SickLeaveService } from './_services/sick-leave.service';
import { SubdivisionService } from './_services/subdivision.service';
import { EmployeesService } from './_services/employees.service';
import { HolidaysService } from './_services/holidays.service';
import { BusinessTripService } from './_services/business-trip.service';
import { HookyService } from './_services/hooky.service';
import { WorkingDaysService } from './_services/working-days.service';
import { CheckDataService } from './_services/check-data.service';
import { EditCheckDataService } from './_services/edit-check-data.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    FormsModule,
    HttpModule,
    HomeModule,
    AdminModule,
    LoginRoutingModule
  ],
  providers: [
    SickLeaveService,
    SubdivisionService,
    EmployeesService,
    HolidaysService,
    BusinessTripService,
    HookyService,
    WorkingDaysService,
    CheckDataService,
    EditCheckDataService,
    // {provide: LOCALE_ID, useValue: 'ua-UA'},
    {provide: MAT_DATE_LOCALE, useValue: 'uk-UK'},
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},       
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
