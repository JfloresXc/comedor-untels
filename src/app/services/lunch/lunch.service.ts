import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import Lunch from 'src/app/models/lunch.model';
import { LoadingService } from '../loading/loading.service';

@Injectable({
  providedIn: 'root'
})
export class LunchService {
  lunch: Lunch = new Lunch();
  lunch$: BehaviorSubject<Lunch> = new BehaviorSubject<Lunch>(new Lunch());

  constructor(private firestore: AngularFirestore,
    private router: Router
    ) {}

  suscribeLunch(Lunch: Lunch){
    this.lunch$.next(Lunch)
  }

  addLunch(Lunch: Lunch): Promise<any> {
    return this.firestore.collection('lunchs').add(Lunch);
  }

  deleteLunch(id: string): Promise<any> {
    return this.firestore.collection('lunchs').doc(id).delete();
  }
 
  getLunch(id: string) {
    this.firestore.collection('lunchs').doc(id).get().subscribe((lunchKey: any) => {
      const id = lunchKey.id

      if (lunchKey.data()) {
        this.suscribeLunch({...lunchKey.data(), id});
      } else {
        this.router.navigate(['/menu']);
      }
    })
  }

  updateLunch(id: string, data: any): Promise<any> {
    return this.firestore.collection('lunchs').doc(id).update(data);
  }
}
