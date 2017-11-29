import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import swal from 'sweetalert2';

import { SubdivisionService } from './../../../_services/subdivision.service';

@Component({
  selector: 'app-subdivision-add-modal',
  templateUrl: './subdivision-add-modal.component.html',
  styleUrls: ['./subdivision-add-modal.component.scss']
})
export class SubdivisionAddModalComponent implements OnInit {
  
  subdivision: any = {};

  constructor(
    public dialogRef: MatDialogRef<SubdivisionAddModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private subdivisionService: SubdivisionService,
  ) { }

  ngOnInit() {
    this.subdivision.name = "";
  }

  createSubdivision() {
    this.subdivisionService.create(this.subdivision);
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
          this.subdivision.name = "";
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
