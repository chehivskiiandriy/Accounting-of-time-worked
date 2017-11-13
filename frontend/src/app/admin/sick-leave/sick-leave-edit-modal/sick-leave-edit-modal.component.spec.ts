import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SickLeaveEditModalComponent } from './sick-leave-edit-modal.component';

describe('SickLeaveEditModalComponent', () => {
  let component: SickLeaveEditModalComponent;
  let fixture: ComponentFixture<SickLeaveEditModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SickLeaveEditModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SickLeaveEditModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
