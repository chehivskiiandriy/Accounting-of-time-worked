import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SickLeaveDeleteModalComponent } from './sick-leave-delete-modal.component';

describe('SickLeaveDeleteModalComponent', () => {
  let component: SickLeaveDeleteModalComponent;
  let fixture: ComponentFixture<SickLeaveDeleteModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SickLeaveDeleteModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SickLeaveDeleteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
