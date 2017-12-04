import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Observable } from 'rxjs/Observable';

import { CheckErrorValidators } from './../../../shared/check-error-validators';
import { datePatternValidator } from './../../../shared/custom-validators';
import { success, error } from './../../../shared/alert';

import { SickLeaveService } from './../../../_services/sick-leave.service';

import * as _moment from 'moment';
const moment = _moment;

@Component({
  selector: 'app-sick-leave-edit-modal',
  templateUrl: './sick-leave-edit-modal.component.html',
  styleUrls: ['./sick-leave-edit-modal.component.scss']
})
export class SickLeaveEditModalComponent implements OnInit {

  sickLeave: any = {};
  minDate;
  maxDate;

  editSickLeaveForm: FormGroup;
  checkErrors: CheckErrorValidators = new CheckErrorValidators();

  formErrors = {
    "startDisease": "",
    "finishDisease": "",
    "disease": ""
  };

  constructor(
    public dialogRef: MatDialogRef<SickLeaveEditModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private sickLeaveService: SickLeaveService,
    private fb: FormBuilder
  ) { }
  
  ngOnInit() {
    console.log(this.data);
    this.setMinAndMaxDate();  
    
    this.sickLeave.fullName = this.data.sickLeave.fullName;
    this.sickLeave.employeeID = this.data.sickLeave.employeeID;
    this.sickLeave.subdivision = this.data.sickLeave.subdivision;
    this.sickLeave.startDisease = moment(this.data.sickLeave.startDisease);
    this.sickLeave.id = this.data.sickLeave.id;
    this.sickLeave.finishDisease = moment(this.data.sickLeave.finishDisease);
    this.sickLeave.disease = this.data.sickLeave.disease; 

    this.buildForm();
  }

  buildForm() {
    this.editSickLeaveForm = this.fb.group({
      "startDisease": [this.sickLeave.startDisease, [
        Validators.required,
        Validators.min(this.minDate),
        Validators.max(this.maxDate),
        datePatternValidator
      ]],
      "finishDisease": [this.sickLeave.finishDisease, [
        Validators.required,
        Validators.min(this.minDate),
        Validators.max(this.maxDate),
        datePatternValidator
      ]],
      "disease": [this.sickLeave.disease, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(40),
        Validators.pattern("[A-ZЄ-ЯҐ]{1}[A-Za-zЄ-ЯҐа-їґ]+$")
      ]]
    });

    this.editSickLeaveForm.valueChanges
      .subscribe(data => this.checkErrors.onValueChange(this.editSickLeaveForm, this.formErrors, data));

    this.checkErrors.onValueChange(this.editSickLeaveForm, this.formErrors);
  }

  setMinAndMaxDate() {
    let today = new Date();
    this.maxDate = moment(today);
    today.setFullYear(today.getFullYear() - 1);
    this.minDate = moment(today);
  }

  editSickLeave() {
    this.sickLeave.startDisease = this.editSickLeaveForm.get("startDisease").value;
    this.sickLeave.finishDisease = this.editSickLeaveForm.get("finishDisease").value;
    this.sickLeave.disease = this.editSickLeaveForm.get("disease").value;

    this.sickLeaveService.update(this.sickLeave);
    this.alert();
  }  

  alert() {
    let s = setInterval(() => {
      if(this.sickLeaveService.success !== undefined){
        clearInterval(s);
        if(this.sickLeaveService.success){
          success();
          setTimeout(() => this.dialogRef.close(), 1600);
          } else {
            error();
          }
      }
    }, 50);

  }

}
