import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import Food from '../models/food.model';

@Injectable({
  providedIn: 'root',
})
export class FoodsService {
  foods: Observable<any[]>;

  constructor(private firestore: AngularFirestore) {
    this.foods = firestore.collection('foods').valueChanges();
  }

  get getFoods() {
    return this.foods;
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
    return this.firestore.collection('foods').doc(id).snapshotChanges();
  }

  updateFood(id: string, data: any): Promise<any> {
    return this.firestore.collection('foods').doc(id).update(data);
  }

  // getFoods$(): Observable<Food[]> {
  //   return this.foods$.asObservable();
  // }

  // suscribeFoods() {
  //   this.foods$.next(this.foods);
  // }
}
