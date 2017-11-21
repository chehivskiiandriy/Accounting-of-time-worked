import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Observable } from 'rxjs/Observable';

import { SickLeaveService } from './../../../_services/sick-leave.service';
import { EditCheckDataService } from './../../../_services/edit-check-data.service';

@Component({
  selector: 'app-sick-leave-edit-modal',
  templateUrl: './sick-leave-edit-modal.component.html',
  styleUrls: ['./sick-leave-edit-modal.component.scss']
})
export class SickLeaveEditModalComponent implements OnInit {

  sickLeave: any = {};

  constructor(
    public dialogRef: MatDialogRef<SickLeaveEditModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private sickLeaveService: SickLeaveService,
    private editCheckDataService: EditCheckDataService
  ) { }
  
  ngOnInit() {
    console.log(this.data);
    
    this.sickLeave.fullName = this.data.sickLeave.fullName;
    this.sickLeave.employeeID = this.data.sickLeave.employeeID;
    this.sickLeave.subdivision = this.data.sickLeave.subdivision;
    this.sickLeave.startDisease = this.data.sickLeave.startDisease;
    this.sickLeave.id = this.data.sickLeave.id;
    this.sickLeave.finishDisease = this.data.sickLeave.finishDisease;
    this.sickLeave.disease = this.data.sickLeave.disease; 
    
  }

  editSickLeave() {

    function pad(number) {
      if (number < 10) {
        return '0' + number;
      }
      return number;
    }
    
    let check = false;
    check = this.editCheckDataService.check(this.sickLeave.employeeID, this.sickLeave.startDisease, this.sickLeave.finishDisease, this.sickLeave.id, "sickLeave");
    console.log(check);

    if(check) {
      this.sickLeave.startDisease = this.editCheckDataService.startDate;
      this.sickLeave.finishDisease = this.editCheckDataService.finishDate;
      console.log(this.sickLeave.startDisease);
      console.log(this.sickLeave.finishDisease);

      this.sickLeaveService.update(this.sickLeave);
      this.dialogRef.close();
    }
  }

}
