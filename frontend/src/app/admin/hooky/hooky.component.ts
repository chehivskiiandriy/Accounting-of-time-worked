import { Component, OnInit, AfterViewChecked  } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { MatDialog } from '@angular/material';

import { HookyService } from './../../_services/hooky.service';

import { HookyAddModalComponent } from './hooky-add-modal/hooky-add-modal.component';
import { HookyEditModalComponent } from './hooky-edit-modal/hooky-edit-modal.component';
import { HookyDeleteModalComponent } from './hooky-delete-modal/hooky-delete-modal.component';

import * as $ from 'jquery';

@Component({
  selector: 'app-hooky',
  templateUrl: './hooky.component.html',
  styleUrls: ['./hooky.component.scss']
})
export class HookyComponent implements OnInit {

  displayedColumns = ['#', 'Full name', 'Employee ID', 'Subdivision', 'Day hooky', 'Actions'];
  hookies: Observable<any[]>;
  page: number = 1;
  countItems: number = 20;
  searchString: string;

  constructor(public dialog: MatDialog, private hookyService: HookyService) { }

  ngOnInit() {
    this.hookies = this.hookyService.hookies;
    this.hookyService.getAll();
    console.log(this.hookies);
  }

  ngAfterViewChecked() {
    $(".top").css("width", $(".table").width());
  }

  resize() {
    $(".top").css("width", $(".table").width());
  }

  createHooky() {
    const dialogRef = this.dialog.open(HookyAddModalComponent, {
      height: '400px',
      width: '400px',
    });
  }

  editHooky(hooky) {
    const dialogRefEdit = this.dialog.open(HookyEditModalComponent, {
      height: '250px',
      width: '400px',
      data: {
        hooky: hooky
      }
    })
  }

  deleteHooky(hooky) {
    const dialogRefDelete = this.dialog.open(HookyDeleteModalComponent, {
      height: '150px',
      width: '250px',
      data: {
        hooky: hooky
      }
    });
  }
}
