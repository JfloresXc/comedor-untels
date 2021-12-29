import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  constructor() {}

  show() {
    this.loading$.next(true);
  }

  hide() {
    this.loading$.next(false);
  }
}
