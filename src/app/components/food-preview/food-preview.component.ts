import { FoodService } from 'src/app/services/food/food.service';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Food from 'src/app/models/food.model';
import { FoodsService } from 'src/app/services/food/foods.service';
import { deleteObject, ref } from 'firebase/storage';
import { storage } from 'src/app/firebase';
import { LoadingService } from 'src/app/services/loading/loading.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-food-preview',
  templateUrl: './food-preview.component.html',
  styleUrls: ['./food-preview.component.css'],
})
export class FoodPreviewComponent implements OnInit {
  @Input() isPreview: boolean = false;
  @Input() food: Food = new Food();

  constructor(
    private foodsService: FoodsService,
    private loadingService: LoadingService,
    private route: Router,
  ) {}

  ngOnInit(): void {
  }

  async delete(food: Food) {
    this.loadingService.show();

    const { id, nombreImagen } = food;
    if (nombreImagen !== 'default.jpg') {
      const fileRef = ref(storage, `menu/${nombreImagen}`);
      await deleteObject(fileRef);
    }
    await this.foodsService.deleteFood(id);
  }

  async redirectEdit(id: any) {
    await this.route.navigate([`/food/${id}`]);
  }
}
