import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  isError$: Subject<boolean> = new Subject();

  constructor() {}

  show() {
    this.isError$.next(true);
  }

  hide() {
    this.isError$.next(false);
  }
}
