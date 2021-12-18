import { Moment } from 'moment';
import { Observable, BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class DateService {
  date$: BehaviorSubject<Moment> = new BehaviorSubject<Moment>(moment());
  constructor() {}

  susbribeDate(date: Moment) {
    this.date$.next(date);
  }

  getDate(): Observable<Moment> {
    return this.date$.asObservable();
  }
}
