import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Observable } from 'rxjs/Observable';

import { CheckErrorValidators } from './../../../shared/check-error-validators';
import { datePatternValidator } from './../../../shared/custom-validators';
import { success, error } from './../../../shared/alert';

import { HookyService } from './../../../_services/hooky.service';

import * as _moment from 'moment';
const moment = _moment;

@Component({
  selector: 'app-hooky-edit-modal',
  templateUrl: './hooky-edit-modal.component.html',
  styleUrls: ['./hooky-edit-modal.component.scss']
})
export class HookyEditModalComponent implements OnInit {

  hooky: any = {};
  minDate;
  maxDate;

  editHookyForm: FormGroup;
  checkErrors: CheckErrorValidators = new CheckErrorValidators();

  formErrors = {
    "dayHooky": ""
  };

  constructor(
    public dialogRef: MatDialogRef<HookyEditModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private hookyService: HookyService,
    private fb: FormBuilder
  ) { }
  
  ngOnInit() { 
    console.log(this.data);
    this.setMinAndMaxDate();  
    
    this.hooky.fullName = this.data.hooky.fullName;
    this.hooky.employeeID = this.data.hooky.employeeID;
    this.hooky.subdivision = this.data.hooky.subdivision;
    this.hooky.dayHooky = moment(this.data.hooky.dayHooky);
    this.hooky.id = this.data.hooky.id;

    this.buildForm();
  }

  buildForm() {
    this.editHookyForm = this.fb.group({
      "dayHooky": [this.hooky.dayHooky, [
        Validators.required,
        Validators.min(this.minDate),
        Validators.max(this.maxDate),
        datePatternValidator
      ]]
    });

    this.editHookyForm.valueChanges
      .subscribe(data => this.checkErrors.onValueChange(this.editHookyForm, this.formErrors, data));

    this.checkErrors.onValueChange(this.editHookyForm, this.formErrors);
  }

  setMinAndMaxDate() {
    let today = new Date();
    this.maxDate = moment(today);
    today.setFullYear(today.getFullYear() - 1);
    this.minDate = moment(today);
  }

  editHooky() {
    this.hooky.dayHooky = this.editHookyForm.get("dayHooky").value;

    this.hookyService.update(this.hooky);
    this.alert();
  }  

  alert() {
    let s = setInterval(() => {
      if(this.hookyService.success !== undefined){
        clearInterval(s);
        if(this.hookyService.success){
          success();
          setTimeout(() => this.dialogRef.close(), 1600);
          } else {
            error();
          }
      }
    }, 50);

  }

}
