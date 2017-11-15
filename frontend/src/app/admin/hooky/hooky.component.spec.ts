import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HookyComponent } from './hooky.component';

describe('HookyComponent', () => {
  let component: HookyComponent;
  let fixture: ComponentFixture<HookyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HookyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HookyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
