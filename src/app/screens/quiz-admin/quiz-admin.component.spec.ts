import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizAdminComponent } from './quiz-admin.component';

describe('QuizAdminComponent', () => {
  let component: QuizAdminComponent;
  let fixture: ComponentFixture<QuizAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuizAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
