import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessTripEditModalComponent } from './business-trip-edit-modal.component';

describe('BusinessTripEditModalComponent', () => {
  let component: BusinessTripEditModalComponent;
  let fixture: ComponentFixture<BusinessTripEditModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessTripEditModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessTripEditModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
