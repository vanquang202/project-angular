import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormRegiterComponent } from './form-regiter.component';

describe('FormRegiterComponent', () => {
  let component: FormRegiterComponent;
  let fixture: ComponentFixture<FormRegiterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormRegiterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormRegiterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
