import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

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
      private subdivisionService: SubdivisionService
    ) { }
  
    ngOnInit() {
      this.subdivision.name = "";
    }
  
    createSubdivision() {
      if(this.subdivision.name != "") {
        this.subdivisionService.create(this.subdivision);
      }
      this.subdivision.name = "";
    }

}
