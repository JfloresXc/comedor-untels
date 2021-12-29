import { Component, OnInit } from '@angular/core';
import Menu from 'src/app/models/menu.model';
import { LoadingService } from 'src/app/services/loading/loading.service';
import { MenusService } from 'src/app/services/menu/menus.service';
import { MatDialog } from '@angular/material/dialog';
import * as moment from 'moment';
import { BreakfastService } from 'src/app/services/breakfast/breakfast.service';
import { LunchService } from 'src/app/services/lunch/lunch.service';
import { DinnerService } from 'src/app/services/dinner/dinner.service';
import Breakfast from 'src/app/models/breakfast.model';
import Lunch from 'src/app/models/lunch.model';
import Dinner from 'src/app/models/dinner.model';
import { FormControl } from '@angular/forms';
import { CardPreviewComponent } from '../card-preview/card-preview.component';
import { FoodService } from 'src/app/services/food/food.service';
import { FoodsService } from 'src/app/services/food/foods.service';
import { CartService } from 'src/app/services/cart/cart.service';
import { UserService } from 'src/app/services/user/user.service';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert/alert.service';

@Component({
  selector: 'app-menu-week',
  templateUrl: './menu-week.component.html',
  styleUrls: ['./menu-week.component.css'],
})
export class MenuWeekComponent implements OnInit {
  isLoading: boolean = false;
  foodsList = [...Array(3).keys()];
  textList = ['Desayuno', 'Almuerzo', 'Cena'];
  menus: Menu[] = [];
  selected = new FormControl(0);

  breakfast: Breakfast = new Breakfast();
  lunch: Lunch = new Lunch();
  dinner: Dinner = new Dinner();

  constructor(
    public dialog: MatDialog,
    private loadingService: LoadingService,
    private menusService: MenusService,
    private breakfastService: BreakfastService,
    private lunchService: LunchService,
    private dinnerService: DinnerService,
    private foodsService: FoodsService,
    private foodService: FoodService,
    private cartService: CartService,
    private userService: UserService,
    private router: Router,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.menusService.menus$.subscribe((menusKey: any) => {
      this.filterDates(menusKey);
    });
    this.filterDates(this.menusService.menus);

    this.loadingService.loading$.subscribe((isLoadingKey) => {
      this.isLoading = isLoadingKey;
    });

    this.breakfastService.breakfast$.subscribe((breakfastKey) => {
      this.breakfast = breakfastKey;
    });

    this.lunchService.lunch$.subscribe((lunchKey) => {
      this.lunch = lunchKey;
    });

    this.dinnerService.dinner$.subscribe((dinnerKey) => {
      this.dinner = dinnerKey;
    });
  }

  filterDates(menus: Menu[]) {
    const daysOfWeek = this.weekLabel(new Date());
    this.menus = menus.filter((menuKey: Menu) => {
      const date = moment(menuKey.fecha).format('DD-MM-YYYY');
      let bandDate = false;

      daysOfWeek.forEach((dateKey) => {
        if (dateKey === date) bandDate = true;
      });
      return bandDate;
    });

    this.tidyWeek(this.menus);
    this.initMenu();
  }

  initMenu() {
    const numberDateActual = moment().isoWeekday();
    this.menus.forEach((menuKey, index) => {
      const numberDate = moment(menuKey.fecha).isoWeekday();
      if (numberDate === numberDateActual) {
        this.selected.setValue(index);
        this.showMenu(index);
      }
    });
  }

  getTextDay(fecha: any) {
    const numberWeekDay = moment(fecha).isoWeekday();
    if (numberWeekDay === 1) return 'Lunes';
    if (numberWeekDay === 2) return 'Martes';
    if (numberWeekDay === 3) return 'Miércoles';
    if (numberWeekDay === 4) return 'Jueves';
    if (numberWeekDay === 5) return 'Viernes';
    if (numberWeekDay === 6) return 'Sabado';
    if (numberWeekDay === 7) return 'Domingo';
    return '';
  }

  weekLabel(current: Date) {
    const week = [];
    const weekFormat: any[] = [];

    if (current.getDay() == 0) {
      current.setDate(current.getDate() - 7 + 1);
    } else {
      current.setDate(current.getDate() - current.getDay() + 1);
    }

    for (let i = 0; i < 7; i++) {
      week.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }
    week.forEach((w) => {
      weekFormat.push(moment(w).format('DD-MM-YYYY'));
    });
    return weekFormat;
  }

  tidyWeek(menus: Menu[]) {
    let menuAux: Menu = new Menu();
    let amount = menus.length;
    for (let i = 0; i < amount; i++) {
      for (let j = 0; j < amount - 1; j++) {
        const dateBack = moment(menus[j].fecha).format('DD-MM-YYYY');
        const dateNext = moment(menus[j + 1].fecha).format('DD-MM-YYYY');
        if (dateBack > dateNext) {
          menuAux = menus[j];
          menus[j] = menus[j + 1];
          menus[j + 1] = menuAux;
        }
      }
    }
  }

  setFoodList(menu: Menu) {
    this.breakfastService.getBreakfast(menu.idDesayunos);
    this.lunchService.getLunch(menu.idAlmuerzos);
    this.dinnerService.getDinner(menu.idCenas);
  }

  showMenu(index: any) {
    const menu = this.menus[index];
    this.setFoodList(menu);
  }

  getFoodList(option: number) {
    if (option === 0) {
      return this.breakfast.foods;
    } else if (option === 1) {
      return this.lunch.foods;
    } else if (option === 2) {
      return this.dinner.foods;
    }
    return [];
  }

  openDialog(food: any) {
    const dialogRef = this.dialog.open(CardPreviewComponent);
    this.showFood(food);

    dialogRef.afterClosed().subscribe((result) => {});
  }

  showFood(food: any) {
    this.foodsService.getFood(food.id).subscribe((foodKey: any) => {
      if (foodKey.data()) {
        this.foodService.suscribeFood(foodKey.data());
      }
    });
  }

  addFoodListToCart(menu: Menu, option: any) {
    let amountFoodList;
    if (this.userService.user.email) {
      let idLista = '';
      if (option === 0) {
        idLista = menu.idDesayunos;
        amountFoodList = this.breakfast.foods.length;
      } else if (option === 1) {
        idLista = menu.idAlmuerzos;
        amountFoodList = this.lunch.foods.length;
      } else if (option === 2) {
        idLista = menu.idCenas;
        amountFoodList = this.dinner.foods.length;
      }

      if (amountFoodList !== 0) {
        this.cartService.addToCartList({
          fecha: moment(menu.fecha).format('ll'),
          idLista,
          textListFood: this.textList[option],
        });
        this.alertService.openSnackBar('✅ Agregado a carrito ✅');
      } else {
        this.alertService.openSnackBar('❌ Lista vacía ❌');
      }
    } else {
      this.router.navigate(['/login']);
    }
  }
}
