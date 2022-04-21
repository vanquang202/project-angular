import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSubjectComponent } from './edit-subject.component';

describe('EditSubjectComponent', () => {
  let component: EditSubjectComponent;
  let fixture: ComponentFixture<EditSubjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditSubjectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSubjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
