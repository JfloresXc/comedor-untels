import { TestBed } from '@angular/core/testing';
import { DateService } from './date.service';
import { Moment } from 'moment';
import * as moment from 'moment';

describe('DateService', () => {
  let service: DateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DateService],
    });
    service = TestBed.inject(DateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#subscribeDate should update date$', () => {
    const newDate: Moment = moment('2024-07-10');
    service.getDate().subscribe((date) => {
      expect(date).toEqual(newDate);
    });
  });
});
