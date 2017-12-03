import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkingDaysDeleteModalComponent } from './working-days-delete-modal.component';

describe('WorkingDaysDeleteModalComponent', () => {
  let component: WorkingDaysDeleteModalComponent;
  let fixture: ComponentFixture<WorkingDaysDeleteModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkingDaysDeleteModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkingDaysDeleteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
