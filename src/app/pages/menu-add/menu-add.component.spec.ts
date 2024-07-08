import { Component, OnInit } from '@angular/core';
import { FoodsService } from 'src/app/services/food/foods.service';
import { LoadingService } from 'src/app/services/loading/loading.service';

@Component({
  selector: 'app-menu-add',
  templateUrl: './menu-add.component.html',
})
export class MenuAddComponent implements OnInit {
  isLoading: boolean = false;
  foods: any[] = [];

  constructor(
    private loadingService: LoadingService,
    private foodsService: FoodsService
  ) {}

  ngOnInit(): void {
    this.fetchFoods(); // Llama a una función para cargar los alimentos

    // Suscripción al observable de cambio en la carga
    this.loadingService.loading$.subscribe((isLoadingKey) => {
      this.isLoading = isLoadingKey;
    });
  }

  fetchFoods() {
    // Obtiene los alimentos desde el servicio de alimentos
    this.foodsService.foods$.subscribe((foods) => {
      this.foods = foods;
    });

    // También asigna los alimentos directamente si ya están disponibles
    this.foods = this.foodsService.foods;
  }
}
