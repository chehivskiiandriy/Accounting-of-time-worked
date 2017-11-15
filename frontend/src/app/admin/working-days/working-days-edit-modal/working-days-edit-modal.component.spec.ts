import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkingDaysEditModalComponent } from './working-days-edit-modal.component';

describe('WorkingDaysEditModalComponent', () => {
  let component: WorkingDaysEditModalComponent;
  let fixture: ComponentFixture<WorkingDaysEditModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkingDaysEditModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkingDaysEditModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
