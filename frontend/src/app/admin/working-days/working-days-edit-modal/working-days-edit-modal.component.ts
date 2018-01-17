import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Observable } from 'rxjs/Observable';

import { CheckErrorValidators } from './../../../shared/check-error-validators';
import { success, error } from './../../../shared/alert';

import { WorkingDaysService } from './../../../_services/working-days.service';

@Component({
  selector: 'app-working-days-edit-modal',
  templateUrl: './working-days-edit-modal.component.html',
  styleUrls: ['./working-days-edit-modal.component.scss']
})
export class WorkingDaysEditModalComponent implements OnInit {

  workingDays: any = {};

  editWorkingDaysForm: FormGroup;
  checkErrors: CheckErrorValidators = new CheckErrorValidators();

  formErrors = {
    "actualAmountWorkDay": ""
  };

  constructor(
    public dialogRef: MatDialogRef<WorkingDaysEditModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private workingDaysService: WorkingDaysService,
    private fb: FormBuilder
  ) { }
  
  ngOnInit() {
    console.log(this.data); 
    
    this.workingDays.fullName = this.data.workingDay.fullName;
    this.workingDays.employeeID = this.data.workingDay.employeeID;
    this.workingDays.subdivision = this.data.workingDay.subdivision;
    this.workingDays.actualAmountWorkDay = this.data.workingDay.actualAmountWorkDay;
    this.workingDays.year = this.data.workingDay.year;
    this.workingDays.month = this.data.workingDay.month; 

    this.buildForm();
  }

  buildForm() {
    this.editWorkingDaysForm = this.fb.group({
      "actualAmountWorkDay": ['', [
        Validators.required,
        Validators.min(1),
        Validators.max(31),
      ]]
    });

    this.editWorkingDaysForm.valueChanges
      .subscribe(data => this.checkErrors.onValueChange(this.editWorkingDaysForm, this.formErrors, data));

    this.checkErrors.onValueChange(this.editWorkingDaysForm, this.formErrors);
  }

  editWorkingDays() {
    this.workingDays.actualAmountWorkDay = this.editWorkingDaysForm.get("actualAmountWorkDay").value;

    this.workingDaysService.update(this.workingDays);
    this.alert();
  }  

  alert() {
    let s = setInterval(() => {
      if(this.workingDaysService.success !== undefined){
        clearInterval(s);
        if(this.workingDaysService.success){
          success();
          setTimeout(() => this.dialogRef.close(), 1600);
          } else {
            error();
          }
      }
    }, 50);

  }

}
