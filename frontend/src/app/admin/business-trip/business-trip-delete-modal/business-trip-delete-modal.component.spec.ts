import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessTripDeleteModalComponent } from './business-trip-delete-modal.component';

describe('BusinessTripDeleteModalComponent', () => {
  let component: BusinessTripDeleteModalComponent;
  let fixture: ComponentFixture<BusinessTripDeleteModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessTripDeleteModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessTripDeleteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
