import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import swal from 'sweetalert2';

import { SubdivisionService } from './../../../_services/subdivision.service';

@Component({
  selector: 'app-subdivision-edit-modal',
  templateUrl: './subdivision-edit-modal.component.html',
  styleUrls: ['./subdivision-edit-modal.component.scss']
})
export class SubdivisionEditModalComponent implements OnInit {

  subdivision: any = {};
  
  constructor(
    public dialogRef: MatDialogRef<SubdivisionEditModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private subdivisionService: SubdivisionService
  ) { }
  
  ngOnInit() {
    console.log(this.data);
    this.subdivision.id = this.data.subdivision.id;
    this.subdivision.name = this.data.subdivision.name;
  }

  editSubdivision() {
    console.log(this.subdivision);
    this.subdivisionService.update(this.subdivision);
    this.alert();
  }

  alert() {
    let s = setInterval(() => {
      if(this.subdivisionService.success !== undefined){
        clearInterval(s);
        if(this.subdivisionService.success){
          swal({
            title: 'Great!',
            text: 'Your work has been saved!',
            type: 'success',
            width: '300px',
            showConfirmButton: false,
            timer: 1500
          });
          setTimeout(() => this.dialogRef.close(), 1600);
          } else {
            swal({
              title: 'Oops...',
              text: 'Something went wrong!',
              type: 'error',
              width: '300px',
              showConfirmButton: false
            });
          }
      }
    }, 50);
  }

}
