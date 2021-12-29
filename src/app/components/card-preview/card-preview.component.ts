import { Component, OnInit } from '@angular/core';
import Food from 'src/app/models/food.model';
import { FoodService } from 'src/app/services/food/food.service';

@Component({
  selector: 'app-card-preview',
  templateUrl: './card-preview.component.html',
  styleUrls: ['./card-preview.component.css'],
})
export class CardPreviewComponent implements OnInit {
  food: Food = new Food();
  constructor(private foodService: FoodService) {}

  ngOnInit(): void {
    this.foodService.$food.subscribe((foodKey: Food) => {
      this.food = foodKey;
    });
  }
}
