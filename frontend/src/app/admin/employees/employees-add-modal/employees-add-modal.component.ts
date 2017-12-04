import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Observable } from 'rxjs/Observable';

import { SubdivisionService } from './../../../_services/subdivision.service';
import { EmployeesService } from './../../../_services/employees.service';

import { CheckErrorValidators } from './../../../shared/check-error-validators';
import { datePatternValidator } from './../../../shared/custom-validators';
import { success, error } from './../../../shared/alert';

import * as _moment from 'moment';
const moment = _moment;

@Component({
  selector: 'app-employees-add-modal',
  templateUrl: './employees-add-modal.component.html',
  styleUrls: ['./employees-add-modal.component.scss']
})
export class EmployeesAddModalComponent implements OnInit {

  employee: any = {};
  selectedSubdivisionName;
  subdivisions: Observable<any[]>;
  minDate;
  maxDate;

  addEmployeeForm: FormGroup;
  checkErrors: CheckErrorValidators = new CheckErrorValidators();

  formErrors = {
    "selectedSubdivision": "",
    "surname": "",
    "name": "",
    "patronymic": "",
    "birthday": ""
  };

  constructor(
    public dialogRef: MatDialogRef<EmployeesAddModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private subdivisionService: SubdivisionService,
    private employeesService: EmployeesService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.setMinAndMaxDate();    

    this.subdivisions = this.subdivisionService.subdivisions;
    this.subdivisionService.getAll();

    this.buildForm();
  }
  
  buildForm() {
    this.addEmployeeForm = this.fb.group({
      "selectedSubdivision": ['', [
        Validators.required
      ]],
      "surname": ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
        Validators.pattern("[A-ZЄ-ЯҐ]{1}[a-zа-їґ]+$")
      ]],
      "name": ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
        Validators.pattern("[A-ZЄ-ЯҐ]{1}[a-zа-їґ]+$")
      ]],
      "patronymic": ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
        Validators.pattern("[A-ZЄ-ЯҐ]{1}[a-zа-їґ]+$")
      ]],
      "birthday": ['', [
        Validators.required,
        Validators.min(this.minDate),
        Validators.max(this.maxDate),
        datePatternValidator
      ]]
    });

    this.addEmployeeForm.valueChanges
      .subscribe(data => this.checkErrors.onValueChange(this.addEmployeeForm, this.formErrors, data));

    this.checkErrors.onValueChange(this.addEmployeeForm, this.formErrors);
  }

  setMinAndMaxDate() {
    let today = new Date();
    today.setFullYear(today.getFullYear() - 16);
    this.maxDate = moment(today);
    today.setFullYear(today.getFullYear() - 50);
    this.minDate = moment(today);
  }

  createEmployee() {
    this.employee.subdivisionID = this.addEmployeeForm.get("selectedSubdivision").value.id;
    this.selectedSubdivisionName = this.addEmployeeForm.get("selectedSubdivision").value.name;
    this.employee.name = this.addEmployeeForm.get("name").value;
    this.employee.surname = this.addEmployeeForm.get("surname").value;
    this.employee.patronymic = this.addEmployeeForm.get("patronymic").value;
    this.employee.birthday = this.addEmployeeForm.get("birthday").value;

    this.employeesService.create(this.employee, this.selectedSubdivisionName);
    this.alert();
  }

  alert() {
    let s = setInterval(() => {
      if(this.employeesService.success !== undefined){
        clearInterval(s);
        if(this.employeesService.success){
          success();
          this.addEmployeeForm.reset();
          this.checkErrors.onValueChange(this.addEmployeeForm, this.formErrors);
          } else {
            error();
          }
      }
    }, 50);

  }

}
