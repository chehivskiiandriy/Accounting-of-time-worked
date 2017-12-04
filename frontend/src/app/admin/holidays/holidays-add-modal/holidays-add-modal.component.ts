import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Observable } from 'rxjs/Observable';

import { CheckErrorValidators } from './../../../shared/check-error-validators';
import { datePatternValidator } from './../../../shared/custom-validators';
import { success, error } from './../../../shared/alert';

import { SubdivisionService } from './../../../_services/subdivision.service';
import { EmployeesService } from './../../../_services/employees.service';
import { HolidaysService } from './../../../_services/holidays.service';

import * as _moment from 'moment';
const moment = _moment;

@Component({
  selector: 'app-holidays-add-modal',
  templateUrl: './holidays-add-modal.component.html',
  styleUrls: ['./holidays-add-modal.component.scss']
})
export class HolidaysAddModalComponent implements OnInit {

  subdivisions: Observable<any[]>;
  employees: Observable<any[]>;
  selectedSubdivision: any = {};
  selectedEmployee: any = {};
  holiday: any = {};
  minDate;
  maxDate;

  fullName: string;
  selectedSubdivisionName: string;

  addHolidayForm: FormGroup;
  checkErrors: CheckErrorValidators = new CheckErrorValidators();

  formErrors = {
    "selectedSubdivision": "",
    "selectedEmployee": "",
    "startHoliday": "",
    "finishHoliday": ""
  };

  constructor(public dialogRef: MatDialogRef<HolidaysAddModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private subdivisionService: SubdivisionService,
    private employeesService: EmployeesService,
    private holidaysService: HolidaysService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.setMinAndMaxDate();  
    
    this.subdivisions = this.subdivisionService.subdivisions;
    this.subdivisionService.getAll();

    this.employees = this.employeesService.employees;
    this.employeesService.getAll();

    this.buildForm();
  }

  buildForm() {
    this.addHolidayForm = this.fb.group({
      "selectedSubdivision": ['', [
      ]],
      "selectedEmployee": ['', [
        Validators.required
      ]],
      "startHoliday": ['', [
        Validators.required,
        Validators.min(this.minDate),
        Validators.max(this.maxDate),
        datePatternValidator
      ]],
      "finishHoliday": ['', [
        Validators.required,
        Validators.min(this.minDate),
        Validators.max(this.maxDate),
        datePatternValidator
      ]]
    });

    this.addHolidayForm.valueChanges
      .subscribe(data => this.checkErrors.onValueChange(this.addHolidayForm, this.formErrors, data));

    this.checkErrors.onValueChange(this.addHolidayForm, this.formErrors);
  }

  setMinAndMaxDate() {
    let today = new Date();
    this.maxDate = moment(today);
    today.setFullYear(today.getFullYear() - 1);
    this.minDate = moment(today);
  }

  onSelect(selected) {
    console.log(selected.id);
    this.employees = this.employeesService.employees.map(e => e.filter((t) => t.subdivisionID === selected.id));
    this.addHolidayForm.get("selectedEmployee").reset();
  }

  createHoliday() {
    this.selectedSubdivisionName = this.addHolidayForm.get("selectedEmployee").value.subdivision;
    this.holiday.employeeID = this.addHolidayForm.get("selectedEmployee").value.id;
    this.holiday.startHoliday = this.addHolidayForm.get("startHoliday").value;
    this.holiday.finishHoliday = this.addHolidayForm.get("finishHoliday").value;

    this.fullName = this.addHolidayForm.get("selectedEmployee").value.surname + ' ' + this.addHolidayForm.get("selectedEmployee").value.name + ' ' + this.addHolidayForm.get("selectedEmployee").value.patronymic;

    console.log(this.holiday);
    console.log(this.selectedEmployee);

    this.holidaysService.create(this.holiday, this.fullName, this.selectedSubdivisionName);
    this.alert();
  }

  alert() {
    let s = setInterval(() => {
      if(this.holidaysService.success !== undefined){
        clearInterval(s);
        if(this.holidaysService.success){
          success();
          this.addHolidayForm.reset();
          this.checkErrors.onValueChange(this.addHolidayForm, this.formErrors);
          } else {
            error();
          }
      }
    }, 50);

  }

}
