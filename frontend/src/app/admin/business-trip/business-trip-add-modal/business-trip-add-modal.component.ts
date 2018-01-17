import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Observable } from 'rxjs/Observable';

import { CheckErrorValidators } from './../../../shared/check-error-validators';
import { datePatternValidator } from './../../../shared/custom-validators';
import { success, error } from './../../../shared/alert';

import { SubdivisionService } from './../../../_services/subdivision.service';
import { EmployeesService } from './../../../_services/employees.service';
import { BusinessTripService } from './../../../_services/business-trip.service';

import * as _moment from 'moment';
const moment = _moment;

@Component({
  selector: 'app-business-trip-add-modal',
  templateUrl: './business-trip-add-modal.component.html',
  styleUrls: ['./business-trip-add-modal.component.scss']
})
export class BusinessTripAddModalComponent implements OnInit {

  subdivisions: Observable<any[]>;
  employees: Observable<any[]>;
  selectedSubdivision: any = {};
  selectedEmployee: any = {};
  businessTrip: any = {};
  minDate;
  maxDate;

  fullName: string;
  selectedSubdivisionName: string;

  addBusinessTripForm: FormGroup;
  checkErrors: CheckErrorValidators = new CheckErrorValidators();

  formErrors = {
    "selectedSubdivision": "",
    "selectedEmployee": "",
    "startBusinessTrip": "",
    "finishBusinessTrip": ""
  };

  constructor(public dialogRef: MatDialogRef<BusinessTripAddModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private subdivisionService: SubdivisionService,
    private employeesService: EmployeesService,
    private businessTripService: BusinessTripService,
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
    this.addBusinessTripForm = this.fb.group({
      "selectedSubdivision": ['', [
      ]],
      "selectedEmployee": ['', [
        Validators.required
      ]],
      "startBusinessTrip": ['', [
        Validators.required,
        Validators.min(this.minDate),
        Validators.max(this.maxDate),
        datePatternValidator
      ]],
      "finishBusinessTrip": ['', [
        Validators.required,
        Validators.min(this.minDate),
        Validators.max(this.maxDate),
        datePatternValidator
      ]]
    });

    this.addBusinessTripForm.valueChanges
      .subscribe(data => this.checkErrors.onValueChange(this.addBusinessTripForm, this.formErrors, data));

    this.checkErrors.onValueChange(this.addBusinessTripForm, this.formErrors);
  }

  setMinAndMaxDate() {
    let today = new Date();
    this.maxDate = moment(today);
    today.setFullYear(today.getFullYear() - 1);
    this.minDate = moment(today);
  }

  onSelect(selected) {
    this.employees = this.employeesService.employees.map(e => e.filter((t) => t.subdivisionID === selected.id));
    this.addBusinessTripForm.get("selectedEmployee").reset();
  }

  createBusinessTrip() {
    this.selectedSubdivisionName = this.addBusinessTripForm.get("selectedEmployee").value.subdivision;
    this.businessTrip.employeeID = this.addBusinessTripForm.get("selectedEmployee").value.id;
    this.businessTrip.startBusinessTrip = this.addBusinessTripForm.get("startBusinessTrip").value;
    this.businessTrip.finishBusinessTrip = this.addBusinessTripForm.get("finishBusinessTrip").value;

    this.fullName = this.addBusinessTripForm.get("selectedEmployee").value.surname + ' ' + this.addBusinessTripForm.get("selectedEmployee").value.name + ' ' + this.addBusinessTripForm.get("selectedEmployee").value.patronymic;

    this.businessTripService.create(this.businessTrip, this.fullName, this.selectedSubdivisionName);
    this.alert();
  }

  alert() {
    let s = setInterval(() => {
      if(this.businessTripService.success !== undefined){
        clearInterval(s);
        if(this.businessTripService.success){
          success();
          this.addBusinessTripForm.reset();
          this.checkErrors.onValueChange(this.addBusinessTripForm, this.formErrors);
          } else {
            error();
          }
      }
    }, 50);

  }

}
