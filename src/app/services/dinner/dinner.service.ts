import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import Dinner from 'src/app/models/dinner.model';

@Injectable({
  providedIn: 'root'
})
export class DinnerService {
  dinner: Dinner = new Dinner();
  dinner$: BehaviorSubject<Dinner> = new BehaviorSubject<Dinner>(new Dinner());

  constructor(
    private firestore: AngularFirestore,
    private router: Router
  ) { }

  suscribeDinner(Dinner: Dinner) {
    this.dinner$.next(Dinner)
  }

  addDinner(Dinner: Dinner): Promise<any> {
    return this.firestore.collection('dinners').add(Dinner);
  }

  deleteDinner(id: string): Promise<any> {
    return this.firestore.collection('dinners').doc(id).delete();
  }

  getDinner(id: string) {
    this.firestore.collection('dinners').doc(id).get().subscribe((dinnerKey: any) => {
      const id = dinnerKey.id

      if (dinnerKey.data()) {
        this.suscribeDinner({ ...dinnerKey.data(), id });
      } else {
        this.router.navigate(['/menu']);
      }
    })
  }

  updateDinner(id: string, data: any): Promise<any> {
    return this.firestore.collection('dinners').doc(id).update(data);
  }
}
