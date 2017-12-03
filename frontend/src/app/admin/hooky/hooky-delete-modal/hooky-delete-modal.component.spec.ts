import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HookyDeleteModalComponent } from './hooky-delete-modal.component';

describe('HookyDeleteModalComponent', () => {
  let component: HookyDeleteModalComponent;
  let fixture: ComponentFixture<HookyDeleteModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HookyDeleteModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HookyDeleteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
