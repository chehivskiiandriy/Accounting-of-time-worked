import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Observable } from 'rxjs/Observable';

import { CheckErrorValidators } from './../../../shared/check-error-validators';
import { datePatternValidator } from './../../../shared/custom-validators';
import { success, error } from './../../../shared/alert';

import { BusinessTripService } from './../../../_services/business-trip.service';

import * as _moment from 'moment';
const moment = _moment;

@Component({
  selector: 'app-business-trip-edit-modal',
  templateUrl: './business-trip-edit-modal.component.html',
  styleUrls: ['./business-trip-edit-modal.component.scss']
})
export class BusinessTripEditModalComponent implements OnInit {

  businessTrip: any = {};
  minDate;
  maxDate;

  editBusinessTripForm: FormGroup;
  checkErrors: CheckErrorValidators = new CheckErrorValidators();

  formErrors = {
    "startBusinessTrip": "",
    "finishBusinessTrip": ""
  };

  constructor(
    public dialogRef: MatDialogRef<BusinessTripEditModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private businessTripService: BusinessTripService,
    private fb: FormBuilder
  ) { }
  
  ngOnInit() {
    console.log(this.data);
    this.setMinAndMaxDate();  
    
    this.businessTrip.fullName = this.data.businessTrip.fullName;
    this.businessTrip.employeeID = this.data.businessTrip.employeeID;
    this.businessTrip.subdivision = this.data.businessTrip.subdivision;
    this.businessTrip.startBusinessTrip = moment(this.data.businessTrip.startBusinessTrip);
    this.businessTrip.id = this.data.businessTrip.id;
    this.businessTrip.finishBusinessTrip = moment(this.data.businessTrip.finishBusinessTrip);

    this.buildForm();
  }

  buildForm() {
    this.editBusinessTripForm = this.fb.group({
      "startBusinessTrip": [this.businessTrip.startBusinessTrip, [
        Validators.required,
        Validators.min(this.minDate),
        Validators.max(this.maxDate),
        datePatternValidator
      ]],
      "finishBusinessTrip": [this.businessTrip.finishBusinessTrip, [
        Validators.required,
        Validators.min(this.minDate),
        Validators.max(this.maxDate),
        datePatternValidator
      ]]
    });

    this.editBusinessTripForm.valueChanges
      .subscribe(data => this.checkErrors.onValueChange(this.editBusinessTripForm, this.formErrors, data));

    this.checkErrors.onValueChange(this.editBusinessTripForm, this.formErrors);
  }

  setMinAndMaxDate() {
    let today = new Date();
    this.maxDate = moment(today);
    today.setFullYear(today.getFullYear() - 1);
    this.minDate = moment(today);
  }

  editBusinessTrip() {
    this.businessTrip.startBusinessTrip = this.editBusinessTripForm.get("startBusinessTrip").value;
    this.businessTrip.finishBusinessTrip = this.editBusinessTripForm.get("finishBusinessTrip").value;

    this.businessTripService.update(this.businessTrip);
    this.alert();
  }  

  alert() {
    let s = setInterval(() => {
      if(this.businessTripService.success !== undefined){
        clearInterval(s);
        if(this.businessTripService.success){
          success();
          setTimeout(() => this.dialogRef.close(), 1600);
          } else {
            error();
          }
      }
    }, 50);

  }

}
