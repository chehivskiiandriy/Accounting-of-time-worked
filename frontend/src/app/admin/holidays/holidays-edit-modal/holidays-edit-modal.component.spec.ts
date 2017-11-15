import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HolidaysEditModalComponent } from './holidays-edit-modal.component';

describe('HolidaysEditModalComponent', () => {
  let component: HolidaysEditModalComponent;
  let fixture: ComponentFixture<HolidaysEditModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HolidaysEditModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HolidaysEditModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
