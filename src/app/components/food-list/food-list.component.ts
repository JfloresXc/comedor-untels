import { FoodsService } from 'src/app/services/foods.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-food-list',
  templateUrl: './food-list.component.html',
  styleUrls: ['./food-list.component.css'],
})
export class FoodListComponent implements OnInit {
  foods: any[] = [];
  constructor(private foodsService: FoodsService, private route: Router) {}

  ngOnInit(): void {
    this.foodsService.getListFoods().subscribe((foodsKeys = []) => {
      this.foods = [];
      foodsKeys.forEach((key: any) => {
        this.foods.push({
          ...key.payload.doc.data(),
          id: key.payload.doc.id,
        });
      });
    });
  }

  delete(id: any) {
    this.foodsService.deleteFood(id);
  }

  redirectEdit(id: any) {
    this.route.navigate([`/food/${id}`]);
  }
}
