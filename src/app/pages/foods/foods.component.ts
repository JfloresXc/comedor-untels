import { Component, OnInit } from '@angular/core';
import { onSnapshot, collection } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { FoodsService } from 'src/app/services/foods.service';

@Component({
  selector: 'app-foods',
  templateUrl: './foods.component.html',
  styleUrls: ['./foods.component.css'],
})
export class FoodsComponent implements OnInit {
  foods: Observable<any[]>;
  constructor(private foodsService: FoodsService) {
    this.foods = foodsService.getFoods;
  }

  ngOnInit(): void {}
}
