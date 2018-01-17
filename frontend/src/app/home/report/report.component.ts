import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Sort } from '@angular/material';

import { SubdivisionService } from './../../_services/subdivision.service';
import { ReportService } from './../../_services/report.service';

import * as $ from 'jquery';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {

  report: any = {};
  employees: any = [];
  subdivisions: Observable<any[]>;
  months = [1,2,3,4,5,6,7,8,9,10,11,12];
  years = [];
  year: number;
  monthAgo: number;
  page: number = 1;
  countItems: number = 20;
  searchString: string;
  sortedData;

  isShowWorkingDays: boolean = false;
  isShowBusinessTrip: boolean = false;
  isShowHolidays: boolean = false;
  isShowHooky: boolean = false;
  isShowSickLeave: boolean = false;

  timeReport: string;
  selectedSubdivision;
  selectedMonth;
  selectedYear;

  constructor(
    private subdivisionService: SubdivisionService,
    private reportService: ReportService
  ) { }

  ngOnInit() {
    this.subdivisions = this.subdivisionService.subdivisions;
    this.subdivisionService.getAll();

    // this.employees = this.employeesService.employees.map(e => e.filter((t) => t.subdivisionID === selected.id));

    let todayYear = new Date().getFullYear();
    this.monthAgo = new Date().getMonth();
    this.year = todayYear;
    
    for(let i = 0; i < 30; i++) {
      this.years[i] = todayYear--;
    }

  }

  ngAfterViewChecked() {
    $(".filter").css("width", $(".table").width());
    $(".parameters").css("width", $(".table").width());
  }
  resize(){
    $(".filter").css("width", $(".table").width());
    $(".parameters").css("width", $(".table").width());
  }

  getReport() {
    this.report.subdivision = this.selectedSubdivision;
    if(this.report.subdivision !== 'showAll') this.report.subdivision = this.selectedSubdivision.id;
    this.report.month = +this.selectedMonth;
    this.report.year = +this.selectedYear;
    this.report.time = this.timeReport;

    console.log(this.report);

    this.reportService.getAll(this.report).subscribe(data => {
      this.employees = data;
      this.sortedData = this.employees.slice();
    });
    
    console.log(this.employees);
  }

  sortData(sort: Sort) {
    const data = this.employees.slice();
    if (!sort.active || sort.direction == '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
        let isAsc = sort.direction == 'asc';
        switch (sort.active) {
          case 'fullname': return compare(a.fullname, b.fullname, isAsc);
          case 'subdivision': return compare(a.subdivision, b.subdivision, isAsc);
          case 'amountWorkingDays': return compare(+a.amountWorkingDays, +b.amountWorkingDays, isAsc);
          case 'businessTrip': return compare(+a.businessTrip, +b.businessTrip, isAsc);
          case 'holidays': return compare(+a.holidays, +b.holidays, isAsc);
          case 'hooky': return compare(+a.hooky, +b.hooky, isAsc);
          case 'sickLeave': return compare(+a.sickLeave, +b.sickLeave, isAsc);
          default: return 0;
        }
      });
  }
}

function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}