import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  
  navLinks = [
    { path: "employees", label: "Працівники"},
    { path: "subdivision", label: "Підрозділи"},
    { path: "sick-leave", label: "Лікарняні"}
    // { path: "holidays", label: "Відпускні"},
    // { path: "business-trip", label: "Відрядження"},
    // { path: "hooky", label: "Прогули"}
  ]

  constructor() { }

  ngOnInit() {
  }

}
