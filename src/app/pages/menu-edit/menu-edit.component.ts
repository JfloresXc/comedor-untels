import { MenuService } from './../../services/menu/menu.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FoodsService } from 'src/app/services/food/foods.service';
import { LoadingService } from 'src/app/services/loading/loading.service';
import { AlertService } from 'src/app/services/alert/alert.service';
import Menu from 'src/app/models/menu.model';
import Utils from '../../utils';
import Food from 'src/app/models/food.model';
import * as moment from 'moment';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-menu-edit',
  templateUrl: './menu-edit.component.html',
})
export class MenuEditComponent implements OnInit {
  idEdit: any;
  isLoading: boolean = false;
  foods: any[] = [];
  menu: Menu = new Menu();

  constructor(
    private loadingService: LoadingService,
    private foodsService: FoodsService,
    private menuService: MenuService,
    private activatedRoute: ActivatedRoute,
  ) {
    this.idEdit = this.activatedRoute.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.foods = this.foodsService.foods;

    this.loadingService.loading$.subscribe((isLoadingKey) => {
      this.isLoading = isLoadingKey;
    });

    this.menuService.getMenu(this.idEdit)
  }

  ngOnDestroy(): void {}
}
