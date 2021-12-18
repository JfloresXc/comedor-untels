import { LoadingService } from 'src/app/services/loading/loading.service';
import { Component, OnInit } from '@angular/core';
import Food from 'src/app/models/food.model';

@Component({
  selector: 'app-food-add',
  templateUrl: './food-add.component.html',
  styleUrls: ['./food-add.component.css'],
})
export class FoodAddComponent implements OnInit {
  food: Food = new Food();

  constructor() {}

  ngOnInit(): void {}
}
