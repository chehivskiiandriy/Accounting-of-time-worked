import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkingDaysAddModalComponent } from './working-days-add-modal.component';

describe('WorkingDaysAddModalComponent', () => {
  let component: WorkingDaysAddModalComponent;
  let fixture: ComponentFixture<WorkingDaysAddModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkingDaysAddModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkingDaysAddModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
