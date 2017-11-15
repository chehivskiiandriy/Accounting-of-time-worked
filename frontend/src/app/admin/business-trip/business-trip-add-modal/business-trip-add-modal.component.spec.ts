import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessTripAddModalComponent } from './business-trip-add-modal.component';

describe('BusinessTripAddModalComponent', () => {
  let component: BusinessTripAddModalComponent;
  let fixture: ComponentFixture<BusinessTripAddModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessTripAddModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessTripAddModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
