import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { MatDialog } from '@angular/material';

import { SubdivisionAddModalComponent } from './subdivision-add-modal/subdivision-add-modal.component';
import { SubdivisionEditModalComponent } from './subdivision-edit-modal/subdivision-edit-modal.component';
import { SubdivisionService } from './../../_services/subdivision.service';

@Component({
  selector: 'app-subdivision',
  templateUrl: './subdivision.component.html',
  styleUrls: ['./subdivision.component.scss']
})
export class SubdivisionComponent implements OnInit {

  displayedColumns = ['#', 'Name', 'Actions'];
  subdivisions: Observable<any[]>;

  constructor( public dialog: MatDialog, private subdivisionService: SubdivisionService) {}

  ngOnInit() {
    this.subdivisions = this.subdivisionService.subdivisions;
    this.subdivisionService.getAll();
    console.log(this.subdivisions);
  }

  createSubdivision(): void {
    const dialogRef = this.dialog.open(SubdivisionAddModalComponent, {
      height: '250px',
      width: '400px',
    });
  }
  
  editSubdivision(subdivision) {
    const dialogRefEdit = this.dialog.open(SubdivisionEditModalComponent, {
      height: '250px',
      width: '400px',
      data: {
        subdivision: subdivision
      }
    })
  }

  deleteSubdivision(subdivision){
    this.subdivisionService.delete(subdivision);
  }

}
