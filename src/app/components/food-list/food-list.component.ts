import { LoadingService } from 'src/app/services/loading/loading.service';
import { FoodsService } from 'src/app/services/food/foods.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormControl } from '@angular/forms';
import Food from 'src/app/models/food.model';

@Component({
  selector: 'app-food-list',
  templateUrl: './food-list.component.html',
  styleUrls: ['./food-list.component.css'],
})
export class FoodListComponent implements OnInit, OnDestroy {
  foods: any[] = [];
  foodsPreview: any[] = [];
  controlInputSearch = new FormControl();
  suscription: Subscription = new Subscription();

  constructor(
    private foodsService: FoodsService,
    private loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.suscription = this.foodsService.foods$.subscribe((foodsKey) => {
      this.foods = foodsKey;
      this.foodsPreview = foodsKey;
    });
    this.foods = this.foodsService.foods;
    this.foodsPreview = this.foodsService.foods;
  }

  ngOnDestroy(): void {
    this.suscription.unsubscribe();
  }

  handleChangeFoods(value: any) {
    this.foodsPreview = this.foods.filter((food: Food) =>
      food.nombre.toLowerCase().includes(value)
    );
  }

}
