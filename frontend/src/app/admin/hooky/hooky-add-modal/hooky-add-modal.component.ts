import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Observable } from 'rxjs/Observable';

import { CheckErrorValidators } from './../../../shared/check-error-validators';
import { datePatternValidator } from './../../../shared/custom-validators';
import { success, error } from './../../../shared/alert';

import { SubdivisionService } from './../../../_services/subdivision.service';
import { EmployeesService } from './../../../_services/employees.service';
import { HookyService } from './../../../_services/hooky.service';

import * as _moment from 'moment';
const moment = _moment;

@Component({
  selector: 'app-hooky-add-modal',
  templateUrl: './hooky-add-modal.component.html',
  styleUrls: ['./hooky-add-modal.component.scss']
})
export class HookyAddModalComponent implements OnInit {

  subdivisions: Observable<any[]>;
  employees: Observable<any[]>;
  selectedSubdivision: any = {};
  selectedEmployee: any = {};
  hooky: any = {};
  minDate;
  maxDate;

  fullName: string;
  selectedSubdivisionName: string;

  addHookyForm: FormGroup;
  checkErrors: CheckErrorValidators = new CheckErrorValidators();

  formErrors = {
    "selectedSubdivision": "",
    "selectedEmployee": "",
    "dayHooky": ""
  };

  constructor(public dialogRef: MatDialogRef<HookyAddModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private subdivisionService: SubdivisionService,
    private employeesService: EmployeesService,
    private hookyService: HookyService,
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
    this.addHookyForm = this.fb.group({
      "selectedSubdivision": ['', [
      ]],
      "selectedEmployee": ['', [
        Validators.required
      ]],
      "dayHooky": ['', [
        Validators.required,
        Validators.min(this.minDate),
        Validators.max(this.maxDate),
        datePatternValidator
      ]]
    });

    this.addHookyForm.valueChanges
      .subscribe(data => this.checkErrors.onValueChange(this.addHookyForm, this.formErrors, data));

    this.checkErrors.onValueChange(this.addHookyForm, this.formErrors);
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
    this.addHookyForm.get("selectedEmployee").reset();
  }

  createHooky() {
    this.selectedSubdivisionName = this.addHookyForm.get("selectedEmployee").value.subdivision;
    this.hooky.employeeID = this.addHookyForm.get("selectedEmployee").value.id;
    this.hooky.dayHooky = this.addHookyForm.get("dayHooky").value;

    this.fullName = this.addHookyForm.get("selectedEmployee").value.surname + ' ' + this.addHookyForm.get("selectedEmployee").value.name + ' ' + this.addHookyForm.get("selectedEmployee").value.patronymic;

    console.log(this.hooky);
    console.log(this.selectedEmployee);

    this.hookyService.create(this.hooky, this.fullName, this.selectedSubdivisionName);
    this.alert();
  }

  alert() {
    let s = setInterval(() => {
      if(this.hookyService.success !== undefined){
        clearInterval(s);
        if(this.hookyService.success){
          success();
          this.addHookyForm.reset();
          this.checkErrors.onValueChange(this.addHookyForm, this.formErrors);
          } else {
            error();
          }
      }
    }, 50);

  }

}
