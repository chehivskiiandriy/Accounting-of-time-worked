import { Component, OnInit, AfterViewChecked  } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { MatDialog, Sort } from '@angular/material';

import { SubdivisionAddModalComponent } from './subdivision-add-modal/subdivision-add-modal.component';
import { SubdivisionEditModalComponent } from './subdivision-edit-modal/subdivision-edit-modal.component';
import { SubdivisionDeleteModalComponent } from './subdivision-delete-modal/subdivision-delete-modal.component';

import { SubdivisionService } from './../../_services/subdivision.service';

import * as $ from 'jquery';

@Component({
  selector: 'app-subdivision',
  templateUrl: './subdivision.component.html',
  styleUrls: ['./subdivision.component.scss']
})
export class SubdivisionComponent implements OnInit {

  subdivisions: Observable<any[]>;
  page: number = 1;
  countItems: number = 20;
  searchString: string;

  constructor( public dialog: MatDialog, private subdivisionService: SubdivisionService) {}

  ngOnInit() {
    this.subdivisions = this.subdivisionService.subdivisions;
    this.subdivisionService.getAll();
    console.log(this.subdivisions);
  }

  ngAfterViewChecked() {
    $(".top").css("width", $(".table").width());
  }
  
  resize(){
    $(".top").css("width", $(".table").width());
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
    const dialogRefDelete = this.dialog.open(SubdivisionDeleteModalComponent, {
      height: '150px',
      width: '250px',
      data: {
        subdivision: subdivision
      }
    });
  }

  sortData(sort: Sort) {
    const data = this.subdivisionService.subdivisions;
    if (!sort.active || sort.direction == '') {
      this.subdivisions = data;
      return;
    }
   
    this.subdivisions = data.do(e => {
      e.sort((a, b) => {
        let isAsc = sort.direction == 'asc';
        switch (sort.active) {
          case 'name': return compare(a.name, b.name, isAsc);
          default: return 0;
        }
      });
    }) 
  }

}

function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}