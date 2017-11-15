import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { HttpModule } from '@angular/http';
import { SharedModule } from './shared/shared.module';
import { MAT_DATE_LOCALE } from '@angular/material';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';


import { HomeModule } from "./home/home.module";
import { AdminModule } from "./admin/admin.module";
import { LoginRoutingModule } from "./login/login-routing.module";

import { SickLeaveService } from './_services/sick-leave.service';
import { SubdivisionService } from './_services/subdivision.service';
import { EmployeesService } from './_services/employees.service';

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
    {provide: MAT_DATE_LOCALE, useValue: 'ua-UA'}    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
