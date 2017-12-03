import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

import { CheckErrorValidators } from './../../../shared/check-error-validators';
import { Alert } from './../../../shared/alert';

import { SubdivisionService } from './../../../_services/subdivision.service';

@Component({
  selector: 'app-subdivision-add-modal',
  templateUrl: './subdivision-add-modal.component.html',
  styleUrls: ['./subdivision-add-modal.component.scss']
})
export class SubdivisionAddModalComponent implements OnInit {

  addSubdivisionForm: FormGroup;
  alertModal: Alert = new Alert();
  checkErrors: CheckErrorValidators = new CheckErrorValidators();

  formErrors = {
    "name": "",
  };

  constructor(
    public dialogRef: MatDialogRef<SubdivisionAddModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private subdivisionService: SubdivisionService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.addSubdivisionForm = this.fb.group({
      "name": ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
        Validators.pattern("[A-ZЄ-ЯҐ]{1}[A-Za-zЄ-ЯҐа-їґ\s]+$")
      ]]
    });

    this.addSubdivisionForm.valueChanges
      .subscribe(data => this.checkErrors.onValueChange(this.addSubdivisionForm, this.formErrors, data));

    this.checkErrors.onValueChange(this.addSubdivisionForm, this.formErrors);
  }

  createSubdivision() {
    this.subdivisionService.create(this.addSubdivisionForm.value);
    this.alert();
  }

  alert() {
    let s = setInterval(() => {
      if (this.subdivisionService.success !== undefined) {
        clearInterval(s);
        if (this.subdivisionService.success) {
          this.alertModal.success();
          this.addSubdivisionForm.reset();
          this.checkErrors.onValueChange(this.addSubdivisionForm, this.formErrors);
        } else {
          this.alertModal.error();
        }
      }
    }, 50);
  }

}
