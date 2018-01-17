import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Observable } from 'rxjs/Observable';

import { CheckErrorValidators } from './../../../shared/check-error-validators';
import { success, error } from './../../../shared/alert';

import { SubdivisionService } from './../../../_services/subdivision.service';
import { EmployeesService } from './../../../_services/employees.service';
import { WorkingDaysService } from './../../../_services/working-days.service';

import * as _moment from 'moment';
const moment = _moment;

@Component({
  selector: 'app-working-days-add-modal',
  templateUrl: './working-days-add-modal.component.html',
  styleUrls: ['./working-days-add-modal.component.scss']
})
export class WorkingDaysAddModalComponent implements OnInit {

  subdivisions: Observable<any[]>;  
  employees: Observable<any[]>;
  selectedSubdivision: any = {};
  selectedEmployee: any = {};
  workingDays: any = {};
  minDate;
  maxDate;

  fullName: string;
  selectedSubdivisionName: string;

  addWorkingDaysForm: FormGroup;
  checkErrors: CheckErrorValidators = new CheckErrorValidators();

  formErrors = {
    "selectedSubdivision": "",
    "selectedEmployee": "",
    "year": "",
    "month": "",
    "actualAmountWorkDay": ""
  };

  constructor(
    public dialogRef: MatDialogRef<WorkingDaysAddModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private subdivisionService: SubdivisionService,
    private employeesService: EmployeesService,
    private workingDaysService: WorkingDaysService,
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
    this.addWorkingDaysForm = this.fb.group({
      "selectedSubdivision": ['', [
      ]],
      "selectedEmployee": ['', [
        Validators.required
      ]],
      "year": ['', [
        Validators.required,
        Validators.min(2000),
        Validators.max(2017)
      ]],
      "month": ['', [
        Validators.required,
        Validators.min(1),
        Validators.max(12)
      ]],
      "actualAmountWorkDay": ['', [
        Validators.required,
        Validators.min(1),
        Validators.max(31),
      ]]
    });

    this.addWorkingDaysForm.valueChanges
      .subscribe(data => this.checkErrors.onValueChange(this.addWorkingDaysForm, this.formErrors, data));

    this.checkErrors.onValueChange(this.addWorkingDaysForm, this.formErrors);
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
    this.addWorkingDaysForm.get("selectedEmployee").reset();
  }

  createWorkingDays() {
    this.selectedSubdivisionName = this.addWorkingDaysForm.get("selectedEmployee").value.subdivision;
    this.workingDays.employeeID = this.addWorkingDaysForm.get("selectedEmployee").value.id;
    this.workingDays.year = this.addWorkingDaysForm.get("year").value;
    this.workingDays.month = this.addWorkingDaysForm.get("month").value;
    this.workingDays.actualAmountWorkDay = this.addWorkingDaysForm.get("actualAmountWorkDay").value;

    this.fullName = this.addWorkingDaysForm.get("selectedEmployee").value.surname + ' ' + this.addWorkingDaysForm.get("selectedEmployee").value.name + ' ' + this.addWorkingDaysForm.get("selectedEmployee").value.patronymic;

    console.log(this.workingDays);
    console.log(this.selectedEmployee);

    this.workingDaysService.create(this.workingDays, this.fullName, this.selectedSubdivisionName);
    this.alert();
  }

  alert() {
    let s = setInterval(() => {
      if(this.workingDaysService.success !== undefined){
        clearInterval(s);
        if(this.workingDaysService.success){
          success();
          this.addWorkingDaysForm.reset();
          this.checkErrors.onValueChange(this.addWorkingDaysForm, this.formErrors);
          } else {
            error();
          }
      }
    }, 50);

  }

}
