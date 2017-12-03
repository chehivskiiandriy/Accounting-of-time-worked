import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubdivisionDeleteModalComponent } from './subdivision-delete-modal.component';

describe('SubdivisionDeleteModalComponent', () => {
  let component: SubdivisionDeleteModalComponent;
  let fixture: ComponentFixture<SubdivisionDeleteModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubdivisionDeleteModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubdivisionDeleteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
