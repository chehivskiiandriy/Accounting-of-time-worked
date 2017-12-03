import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

import { CheckErrorValidators } from './../../../shared/check-error-validators';
import { Alert } from './../../../shared/alert';

import { SubdivisionService } from './../../../_services/subdivision.service';

@Component({
  selector: 'app-subdivision-edit-modal',
  templateUrl: './subdivision-edit-modal.component.html',
  styleUrls: ['./subdivision-edit-modal.component.scss']
})
export class SubdivisionEditModalComponent implements OnInit {

  subdivision: any = {};
  editSubdivisionForm: FormGroup;
  alertModal: Alert = new Alert();
  checkErrors: CheckErrorValidators = new CheckErrorValidators();

  formErrors = {
    "name": "",
  };

  constructor(
    public dialogRef: MatDialogRef<SubdivisionEditModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private subdivisionService: SubdivisionService,
    private fb: FormBuilder
  ) { }
  
  ngOnInit() {
    console.log(this.data);
    this.subdivision.id = this.data.subdivision.id;
    this.subdivision.name = this.data.subdivision.name;
    this.buildForm();    
  }

  buildForm() {
    this.editSubdivisionForm = this.fb.group({
      "name": [this.subdivision.name, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
        Validators.pattern("[A-ZЄ-ЯҐ]{1}[A-Za-zЄ-ЯҐа-їґ\s]+$")
      ]]
    });

    this.editSubdivisionForm.valueChanges
      .subscribe(data => this.checkErrors.onValueChange(this.editSubdivisionForm, this.formErrors, data));

    this.checkErrors.onValueChange(this.editSubdivisionForm, this.formErrors);
  }

  editSubdivision() {
    console.log(this.subdivision);
    this.subdivision.name = this.editSubdivisionForm.get('name').value;
    this.subdivisionService.update(this.subdivision);
    this.alert();
  }

  alert() {
    let s = setInterval(() => {
      if(this.subdivisionService.success !== undefined){
        clearInterval(s);
        if(this.subdivisionService.success){
          this.alertModal.success();
          setTimeout(() => this.dialogRef.close(), 1600);
          } else {
            this.alertModal.error();
          }
      }
    }, 50);
  }

}
