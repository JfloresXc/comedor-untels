import { LoadingService } from 'src/app/services/loading/loading.service';
import { FoodsService } from 'src/app/services/food/foods.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-food-list',
  templateUrl: './food-list.component.html',
  styleUrls: ['./food-list.component.css'],
})
export class FoodListComponent implements OnInit, OnDestroy {
  foods: any[] = [];
  suscription: Subscription = new Subscription();

  constructor(
    private foodsService: FoodsService,
    private loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    // if (this.foodsService.foods.length === 0) {
    //   Promise.resolve().then(() => {
    //     this.loadingService.show();
    //   });
    // }

    this.suscription = this.foodsService.foods$.subscribe((foodsKey) => {
      this.foods = foodsKey;
      // this.loadingService.hide();
    });
    this.foods = this.foodsService.foods;
  }

  ngOnDestroy(): void {
    this.suscription.unsubscribe();
  }
}
