import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeesEditModalComponent } from './employees-edit-modal.component';

describe('EmployeesEditModalComponent', () => {
  let component: EmployeesEditModalComponent;
  let fixture: ComponentFixture<EmployeesEditModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeesEditModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeesEditModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
