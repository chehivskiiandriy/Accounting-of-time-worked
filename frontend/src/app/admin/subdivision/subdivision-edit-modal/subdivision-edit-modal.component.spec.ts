import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubdivisionEditModalComponent } from './subdivision-edit-modal.component';

describe('SubdivisionEditModalComponent', () => {
  let component: SubdivisionEditModalComponent;
  let fixture: ComponentFixture<SubdivisionEditModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubdivisionEditModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubdivisionEditModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
