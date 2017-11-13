import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SickLeaveAddModalComponent } from './sick-leave-add-modal.component';

describe('SickLeaveAddModalComponent', () => {
  let component: SickLeaveAddModalComponent;
  let fixture: ComponentFixture<SickLeaveAddModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SickLeaveAddModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SickLeaveAddModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
