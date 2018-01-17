import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmploSubComponent } from './emplo-sub.component';

describe('EmploSubComponent', () => {
  let component: EmploSubComponent;
  let fixture: ComponentFixture<EmploSubComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmploSubComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmploSubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
