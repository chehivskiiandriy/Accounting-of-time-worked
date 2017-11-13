import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SickLeaveComponent } from './sick-leave.component';

describe('SickLeaveComponent', () => {
  let component: SickLeaveComponent;
  let fixture: ComponentFixture<SickLeaveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SickLeaveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SickLeaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
