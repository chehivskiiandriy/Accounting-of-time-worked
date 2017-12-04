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
  selector: 'app-employees-edit-modal',
  templateUrl: './employees-edit-modal.component.html',
  styleUrls: ['./employees-edit-modal.component.scss']
})
export class EmployeesEditModalComponent implements OnInit {

  employee: any = {};
  selectedSubdivision: any;
  subdivisions: Observable<any[]>;
  name: any;
  minDate;
  maxDate;

  editEmployeeForm: FormGroup;
  checkErrors: CheckErrorValidators = new CheckErrorValidators();

  formErrors = {
    "selectedSubdivision": "",
    "surname": "",
    "name": "",
    "patronymic": "",
    "birthday": ""
  };

  constructor(
    public dialogRef: MatDialogRef<EmployeesEditModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private subdivisionService: SubdivisionService,
    private employeesService: EmployeesService,
    private fb: FormBuilder
  ) { }
  
  ngOnInit() {
    console.log(this.data);
    
    this.getEmployeeData();

    this.setMinAndMaxDate();  

    this.subdivisions = this.subdivisionService.subdivisions;
    this.subdivisionService.getAll();

    this.buildForm();
  }

  buildForm() {
    console.log(this.selectedSubdivision);
    this.editEmployeeForm = this.fb.group({
      "selectedSubdivision": [this.selectedSubdivision, [
        Validators.required
      ]],
      "surname": [this.employee.surname, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
        Validators.pattern("[A-ZЄ-ЯҐ]{1}[a-zа-їґ]+$")
      ]],
      "name": [this.employee.name, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
        Validators.pattern("[A-ZЄ-ЯҐ]{1}[a-zа-їґ]+$")
      ]],
      "patronymic": [this.employee.patronymic, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
        Validators.pattern("[A-ZЄ-ЯҐ]{1}[a-zа-їґ]+$")
      ]],
      "birthday": [this.employee.birthday, [
        Validators.required,
        Validators.min(this.minDate),
        Validators.max(this.maxDate),
        datePatternValidator
      ]]
    });

    this.editEmployeeForm.valueChanges
      .subscribe(data => this.checkErrors.onValueChange(this.editEmployeeForm, this.formErrors, data));

    this.checkErrors.onValueChange(this.editEmployeeForm, this.formErrors);
  }

  getEmployeeData() {
    this.employee.name = this.data.employee.name;
    this.employee.surname = this.data.employee.surname;
    this.employee.patronymic = this.data.employee.patronymic;
    this.employee.birthday = moment(this.data.employee.birthday);
    this.employee.id = this.data.employee.id;
    this.selectedSubdivision = this.data.employee.subdivisionID;  
  }

  setMinAndMaxDate() {
    let today = new Date();
    today.setFullYear(today.getFullYear() - 16);
    this.maxDate = moment(today);
    today.setFullYear(today.getFullYear() - 50);
    this.minDate = moment(today);
  }

  editEmployee() {
    this.employee.subdivisionID = this.editEmployeeForm.get("selectedSubdivision").value;
    this.name = this.subdivisionService.getSub(this.employee.subdivisionID);
    this.employee.name = this.editEmployeeForm.get("name").value;
    this.employee.surname = this.editEmployeeForm.get("surname").value;
    this.employee.patronymic = this.editEmployeeForm.get("patronymic").value;
    this.employee.birthday = this.editEmployeeForm.get("birthday").value;

    this.employeesService.update(this.employee, this.name);
    this.alert();
  }

  alert() {
    let s = setInterval(() => {
      if(this.employeesService.success !== undefined){
        clearInterval(s);
        if(this.employeesService.success){
          success();
          setTimeout(() => this.dialogRef.close(), 1600);
          } else {
            error();
          }
      }
    }, 50);

  }
  
}
