import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeesAddModalComponent } from './employees-add-modal.component';

describe('EmployeesAddModalComponent', () => {
  let component: EmployeesAddModalComponent;
  let fixture: ComponentFixture<EmployeesAddModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeesAddModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeesAddModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
