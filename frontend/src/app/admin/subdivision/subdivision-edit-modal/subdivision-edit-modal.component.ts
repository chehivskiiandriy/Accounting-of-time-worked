import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

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
    console.log(this.subdivision.name);
  }

  editSubdivision() {
    console.log(this.subdivision);
    console.log("asdddddd");
    if(this.subdivision.name != "") {
      this.subdivisionService.update(this.subdivision);
      this.dialogRef.close();
    }
  }

}
