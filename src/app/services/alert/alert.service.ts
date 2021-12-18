import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  message$: Subject<string> = new Subject();
  constructor(private _snackBar: MatSnackBar) {}

  setMessage(message: string) {
    this.message$.next(message);
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'Cerrar', {
      duration: 5 * 1000,
    });
  }
}
