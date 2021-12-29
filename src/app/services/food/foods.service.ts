import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { LoadingService } from '../loading/loading.service';
import Food from '../../models/food.model';

@Injectable({
  providedIn: 'root',
})
export class FoodsService {
  foods$: Subject<Food[]> = new Subject<Food[]>();
  foods: Food[] = [];
  loading: boolean = true;

  constructor(
    private firestore: AngularFirestore,
    private loadingService: LoadingService
  ) {
    this.loadingService.show();
    this.firestore
      .collection('foods')
      .snapshotChanges()
      .subscribe((foodsKeys = []) => {
        this.foods = [];
        foodsKeys.forEach((key: any) => {
          this.foods.push({
            ...key.payload.doc.data(),
            id: key.payload.doc.id,
          });
        });

        this.foods$.next(this.foods);
        this.loadingService.hide();
      });
  }

  getListFoods(): Observable<any> {
    return this.firestore.collection('foods').snapshotChanges();
  }

  addFood(food: Food): Promise<any> {
    return this.firestore.collection('foods').add(food);
  }

  deleteFood(id: string): Promise<any> {
    return this.firestore.collection('foods').doc(id).delete();
  }

  getFood(id: string): Observable<any> {
    return this.firestore.collection('foods').doc(id).get();
  }

  updateFood(id: string, data: any): Promise<any> {
    return this.firestore.collection('foods').doc(id).update(data);
  }
}
