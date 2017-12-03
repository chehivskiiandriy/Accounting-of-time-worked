import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HolidaysDeleteModalComponent } from './holidays-delete-modal.component';

describe('HolidaysDeleteModalComponent', () => {
  let component: HolidaysDeleteModalComponent;
  let fixture: ComponentFixture<HolidaysDeleteModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HolidaysDeleteModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HolidaysDeleteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
