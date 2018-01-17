import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  navLinks = [
    { path: "report", label: "Табель"},    
    { path: "employees-subdivisions", label: "Співробітники і підрозділи"}
  ]

  constructor() { }

  ngOnInit() {
  }

}
