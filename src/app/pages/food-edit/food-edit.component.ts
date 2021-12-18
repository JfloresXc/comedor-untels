import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Food from 'src/app/models/food.model';
import { FoodService } from 'src/app/services/food/food.service';
import { FoodsService } from 'src/app/services/food/foods.service';
import { LoadingService } from 'src/app/services/loading/loading.service';

@Component({
  selector: 'app-food-edit',
  templateUrl: './food-edit.component.html',
  styleUrls: ['./food-edit.component.css'],
})
export class FoodEditComponent implements OnInit {
  id: any;
  food: Food = new Food();
  isLoading: boolean = false;

  constructor(
    private foodsService: FoodsService,
    private foodService: FoodService,
    private loadingService: LoadingService,
    private activatedRoute: ActivatedRoute
  ) {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    Promise.resolve().then(() => this.loadingService.show());

    this.foodsService.getFood(this.id).subscribe((food) => {
      this.food = {
        ...this.food,
        ...food.data(),
        id: this.id,
      };
      this.foodService.suscribeFood(this.food);
      this.loadingService.hide();
    });

    this.loadingService.loading$.subscribe((isLoadingKey) => {
      this.isLoading = isLoadingKey;
    });
  }
}
