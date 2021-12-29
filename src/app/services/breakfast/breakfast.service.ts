import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import Breakfast from 'src/app/models/breakfast.model';
import { LoadingService } from '../loading/loading.service';

@Injectable({
  providedIn: 'root'
})
export class BreakfastService {
  breakfast: Breakfast = new Breakfast();
  breakfast$: BehaviorSubject<Breakfast> = new BehaviorSubject<Breakfast>(new Breakfast());

  constructor(private firestore: AngularFirestore,
    private loadingService: LoadingService,
    private router: Router
    ) {}

  suscribeBreakfast(breakfast: Breakfast){
    this.breakfast$.next(breakfast)
  }

  addBreakfast(Breakfast: Breakfast): Promise<any> {
    return this.firestore.collection('breakfasts').add(Breakfast);
  }

  deleteBreakfast(id: string): Promise<any> {
    return this.firestore.collection('breakfasts').doc(id).delete();
  }
 
  getBreakfast(id: string) {
    this.firestore.collection('breakfasts').doc(id).get().subscribe((breakfastKey: any) => {
      const id = breakfastKey.id

      if (breakfastKey.data()) {
        this.suscribeBreakfast({...breakfastKey.data(), id});
      } else {
        this.router.navigate(['/menu']);
      }
    })

  }

  updateBreakfast(id: string, data: any): Promise<any> {
    return this.firestore.collection('breakfasts').doc(id).update(data);
  }
}
