import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

import { SubdivisionService } from './../../../_services/subdivision.service';

@Component({
  selector: 'app-subdivision-add-modal',
  templateUrl: './subdivision-add-modal.component.html',
  styleUrls: ['./subdivision-add-modal.component.scss']
})
export class SubdivisionAddModalComponent implements OnInit {
  
  subdivision: any = {};
  userForm: FormGroup;

  formErrors = {
    "name": ""
};

// Объект с сообщениями ошибок
validationMessages = {
    "name": {
        "required": "Обязательное поле.",
        "minlength": "Значение должно быть не менее 4х символов.",
        "maxlength": "Значение не должно быть больше 15 символов."
    }
};

  constructor(
    public dialogRef: MatDialogRef<SubdivisionAddModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private subdivisionService: SubdivisionService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.buildForm();
    this.subdivision.name = "";
  }

  createSubdivision() {
    console.log(this.userForm.value);

    if(this.subdivision.name.length != "") {
      this.subdivisionService.create(this.subdivision);
    }
    this.subdivision.name = "";
    
    this.formErrors.name = "";

    console.log(this.userForm.controls.value);
    console.log(this.userForm.pristine);
    // this.userForm.reset();
    this.userForm.controls["name"].markAsPristine();
    console.log(this.userForm.pristine);
  }

  buildForm() {
    this.userForm = this.fb.group({
        "name": [this.subdivision.name, [
            Validators.required,
            Validators.minLength(4),
            Validators.maxLength(15)
        ]]
    });

    this.userForm.valueChanges
        .subscribe(data => this.onValueChange(data));

    this.onValueChange();
}

onValueChange(data?: any) {
    if (!this.userForm) return;
    let form = this.userForm;

    for (let field in this.formErrors) {
        this.formErrors[field] = "";
        // form.get - получение элемента управления
        let control = form.get(field);

        if (control && control.dirty && !control.valid) {
            let message = this.validationMessages[field];
            for (let key in control.errors) {
                this.formErrors[field] += message[key] + " ";
            }
        }
    }
}

}
