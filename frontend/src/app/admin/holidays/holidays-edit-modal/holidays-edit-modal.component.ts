import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Observable } from 'rxjs/Observable';

import { CheckErrorValidators } from './../../../shared/check-error-validators';
import { datePatternValidator } from './../../../shared/custom-validators';
import { success, error } from './../../../shared/alert';

import { HolidaysService } from './../../../_services/holidays.service';

import * as _moment from 'moment';
const moment = _moment;

@Component({
  selector: 'app-holidays-edit-modal',
  templateUrl: './holidays-edit-modal.component.html',
  styleUrls: ['./holidays-edit-modal.component.scss']
})
export class HolidaysEditModalComponent implements OnInit {

  holiday: any = {};
  minDate;
  maxDate;

  editHolidayForm: FormGroup;
  checkErrors: CheckErrorValidators = new CheckErrorValidators();

  formErrors = {
    "startHoliday": "",
    "finishHoliday": ""
  };

  constructor(
    public dialogRef: MatDialogRef<HolidaysEditModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private holidaysService: HolidaysService,
    private fb: FormBuilder
  ) { }
  
  ngOnInit() {
    console.log(this.data);
    this.setMinAndMaxDate();  
    
    this.holiday.fullName = this.data.holiday.fullName;
    this.holiday.employeeID = this.data.holiday.employeeID;
    this.holiday.subdivision = this.data.holiday.subdivision;
    this.holiday.startHoliday = moment(this.data.holiday.startHoliday);
    this.holiday.id = this.data.holiday.id;
    this.holiday.finishHoliday = moment(this.data.holiday.finishHoliday);

    this.buildForm();
  }

  buildForm() {
    this.editHolidayForm = this.fb.group({
      "startHoliday": [this.holiday.startHoliday, [
        Validators.required,
        Validators.min(this.minDate),
        Validators.max(this.maxDate),
        datePatternValidator
      ]],
      "finishHoliday": [this.holiday.finishHoliday, [
        Validators.required,
        Validators.min(this.minDate),
        Validators.max(this.maxDate),
        datePatternValidator
      ]]
    });

    this.editHolidayForm.valueChanges
      .subscribe(data => this.checkErrors.onValueChange(this.editHolidayForm, this.formErrors, data));

    this.checkErrors.onValueChange(this.editHolidayForm, this.formErrors);
  }

  setMinAndMaxDate() {
    let today = new Date();
    this.maxDate = moment(today);
    today.setFullYear(today.getFullYear() - 1);
    this.minDate = moment(today);
  }

  editHoliday() {
    this.holiday.startHoliday = this.editHolidayForm.get("startHoliday").value;
    this.holiday.finishHoliday = this.editHolidayForm.get("finishHoliday").value;

    this.holidaysService.update(this.holiday);
    this.alert();
  }  

  alert() {
    let s = setInterval(() => {
      if(this.holidaysService.success !== undefined){
        clearInterval(s);
        if(this.holidaysService.success){
          success();
          setTimeout(() => this.dialogRef.close(), 1600);
          } else {
            error();
          }
      }
    }, 50);

  }

}
