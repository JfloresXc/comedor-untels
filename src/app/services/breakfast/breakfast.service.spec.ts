import { TestBed } from '@angular/core/testing';

import { BreakfastService } from './breakfast.service';

describe('BreakfastService', () => {
  let service: BreakfastService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BreakfastService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
