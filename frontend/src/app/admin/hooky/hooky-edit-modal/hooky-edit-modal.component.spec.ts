import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HookyEditModalComponent } from './hooky-edit-modal.component';

describe('HookyEditModalComponent', () => {
  let component: HookyEditModalComponent;
  let fixture: ComponentFixture<HookyEditModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HookyEditModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HookyEditModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
