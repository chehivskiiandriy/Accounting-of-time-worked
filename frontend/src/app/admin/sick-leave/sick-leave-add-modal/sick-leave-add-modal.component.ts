import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Observable } from 'rxjs/Observable';

import { CheckErrorValidators } from './../../../shared/check-error-validators';
import { datePatternValidator } from './../../../shared/custom-validators';
import { success, error } from './../../../shared/alert';

import { SubdivisionService } from './../../../_services/subdivision.service';
import { EmployeesService } from './../../../_services/employees.service';
import { SickLeaveService } from './../../../_services/sick-leave.service';

import * as _moment from 'moment';
const moment = _moment;

@Component({
  selector: 'app-sick-leave-add-modal',
  templateUrl: './sick-leave-add-modal.component.html',
  styleUrls: ['./sick-leave-add-modal.component.scss']
})
export class SickLeaveAddModalComponent implements OnInit {
    
  subdivisions: Observable<any[]>;  
  employees: Observable<any[]>;
  selectedSubdivision: any = {};
  selectedEmployee: any = {};
  sickLeave: any = {};
  minDate;
  maxDate;

  fullName: string;
  selectedSubdivisionName: string;

  addSickLeaveForm: FormGroup;
  checkErrors: CheckErrorValidators = new CheckErrorValidators();

  formErrors = {
    "selectedSubdivision": "",
    "selectedEmployee": "",
    "startDisease": "",
    "finishDisease": "",
    "disease": ""
  };

  constructor(
    public dialogRef: MatDialogRef<SickLeaveAddModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private subdivisionService: SubdivisionService,
    private employeesService: EmployeesService,
    private sickLeaveService: SickLeaveService,
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
    this.addSickLeaveForm = this.fb.group({
      "selectedSubdivision": ['', [
      ]],
      "selectedEmployee": ['', [
        Validators.required
      ]],
      "startDisease": ['', [
        Validators.required,
        Validators.min(this.minDate),
        Validators.max(this.maxDate),
        datePatternValidator
      ]],
      "finishDisease": ['', [
        Validators.required,
        Validators.min(this.minDate),
        Validators.max(this.maxDate),
        datePatternValidator
      ]],
      "disease": ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(40),
        Validators.pattern("[A-ZЄ-ЯҐ]{1}[A-Za-zЄ-ЯҐа-їґ]+$")
      ]]
    });

    this.addSickLeaveForm.valueChanges
      .subscribe(data => this.checkErrors.onValueChange(this.addSickLeaveForm, this.formErrors, data));

    this.checkErrors.onValueChange(this.addSickLeaveForm, this.formErrors);
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
    this.addSickLeaveForm.get("selectedEmployee").reset();
  }

  createSickLeave() {
    this.selectedSubdivisionName = this.addSickLeaveForm.get("selectedEmployee").value.subdivision;
    this.sickLeave.employeeID = this.addSickLeaveForm.get("selectedEmployee").value.id;
    this.sickLeave.startDisease = this.addSickLeaveForm.get("startDisease").value;
    this.sickLeave.finishDisease = this.addSickLeaveForm.get("finishDisease").value;
    this.sickLeave.disease = this.addSickLeaveForm.get("disease").value;

    this.fullName = this.addSickLeaveForm.get("selectedEmployee").value.surname + ' ' + this.addSickLeaveForm.get("selectedEmployee").value.name + ' ' + this.addSickLeaveForm.get("selectedEmployee").value.patronymic;

    console.log(this.sickLeave);
    console.log(this.selectedEmployee);

    this.sickLeaveService.create(this.sickLeave, this.fullName, this.selectedSubdivisionName);
    this.alert();
  }

  alert() {
    let s = setInterval(() => {
      if(this.sickLeaveService.success !== undefined){
        clearInterval(s);
        if(this.sickLeaveService.success){
          success();
          this.addSickLeaveForm.reset();
          this.checkErrors.onValueChange(this.addSickLeaveForm, this.formErrors);
          } else {
            error();
          }
      }
    }, 50);

  }
}
