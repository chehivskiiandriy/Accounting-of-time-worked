import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { MatDialog } from '@angular/material';

import { HookyService } from './../../_services/hooky.service';

import { HookyAddModalComponent } from './hooky-add-modal/hooky-add-modal.component';
import { HookyEditModalComponent } from './hooky-edit-modal/hooky-edit-modal.component';

@Component({
  selector: 'app-hooky',
  templateUrl: './hooky.component.html',
  styleUrls: ['./hooky.component.scss']
})
export class HookyComponent implements OnInit {

  displayedColumns = ['#', 'Full name', 'Employee ID', 'Subdivision', 'Day hooky', 'Actions'];
  hookies: Observable<any[]>;

  constructor( public dialog: MatDialog, private hookyService: HookyService) {}

  ngOnInit() {
    this.hookies = this.hookyService.hookies;
    this.hookyService.getAll();
    console.log(this.hookies);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(HookyAddModalComponent, {
      height: '550px',
      width: '400px',
    });
  }
}
