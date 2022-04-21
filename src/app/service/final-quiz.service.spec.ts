import { TestBed } from '@angular/core/testing';

import { FinalQuizService } from './final-quiz.service';

describe('FinalQuizService', () => {
  let service: FinalQuizService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FinalQuizService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
