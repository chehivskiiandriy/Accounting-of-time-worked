import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeesDeleteModalComponent } from './employees-delete-modal.component';

describe('EmployeesDeleteModalComponent', () => {
  let component: EmployeesDeleteModalComponent;
  let fixture: ComponentFixture<EmployeesDeleteModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeesDeleteModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeesDeleteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
