import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { EventEmitter, Injectable } from '@angular/core';
import Food from 'src/app/models/food.model';

@Injectable({
  providedIn: 'root',
})
export class FoodService {
  $food: BehaviorSubject<Food> = new BehaviorSubject<Food>(new Food());
  food: Food = new Food();

  constructor() {}

  get$Food(): Observable<any> {
    return this.$food.asObservable();
  }

  suscribeFood(food: Food) {
    this.$food.next(food);
  }
}
