import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HookyAddModalComponent } from './hooky-add-modal.component';

describe('HookyAddModalComponent', () => {
  let component: HookyAddModalComponent;
  let fixture: ComponentFixture<HookyAddModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HookyAddModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HookyAddModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
