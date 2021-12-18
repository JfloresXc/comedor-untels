import { LoadingService } from './../../services/loading/loading.service';
import { Component, OnInit } from '@angular/core';
import { onSnapshot, collection } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { FoodsService } from 'src/app/services/food/foods.service';

@Component({
  selector: 'app-foods',
  templateUrl: './foods.component.html',
  styleUrls: ['./foods.component.css'],
})
export class FoodsComponent implements OnInit {
  foods: Observable<any[]>;
  isLoading: boolean = false;

  constructor(
    private foodsService: FoodsService,
    private loadingService: LoadingService
  ) {
    this.foods = this.foodsService.foods$;
  }

  ngOnInit(): void {
    this.loadingService.loading$.subscribe((isLoadingKey) => {
      this.isLoading = isLoadingKey;
    });
  }
}
