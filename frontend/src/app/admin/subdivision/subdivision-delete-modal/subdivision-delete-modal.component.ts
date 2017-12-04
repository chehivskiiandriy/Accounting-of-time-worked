import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { SubdivisionService } from './../../../_services/subdivision.service';
import { error } from './../../../shared/alert';

@Component({
  selector: 'app-subdivision-delete-modal',
  templateUrl: './subdivision-delete-modal.component.html',
  styleUrls: ['./subdivision-delete-modal.component.scss']
})
export class SubdivisionDeleteModalComponent implements OnInit {

  subdivision: any = {};

  constructor(public dialogRef: MatDialogRef<SubdivisionDeleteModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private subdivisionService: SubdivisionService) { }

  ngOnInit() {
    this.subdivision = this.data.subdivision;
  }

  deleteSubdivision() {
    this.subdivisionService.delete(this.subdivision);
    this.alert();
  }

  alert() {
    let s = setInterval(() => {
      if(this.subdivisionService.success !== undefined){
        clearInterval(s);
        if(this.subdivisionService.success){
          this.dialogRef.close();
          } else {
            error();
          }
      }
    }, 50);

  }

}
