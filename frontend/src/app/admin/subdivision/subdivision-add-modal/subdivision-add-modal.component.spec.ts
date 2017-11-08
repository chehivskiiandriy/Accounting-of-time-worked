import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubdivisionAddModalComponent } from './subdivision-add-modal.component';

describe('SubdivisionAddModalComponent', () => {
  let component: SubdivisionAddModalComponent;
  let fixture: ComponentFixture<SubdivisionAddModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubdivisionAddModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubdivisionAddModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
