import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import * as moment from 'moment';
import { Subscription } from 'rxjs';

import Menu from 'src/app/models/menu.model';
import Breakfast from 'src/app/models/breakfast.model';
import Lunch from 'src/app/models/lunch.model';
import Dinner from 'src/app/models/dinner.model';
import { MenusService } from 'src/app/services/menu/menus.service';
import { LoadingService } from 'src/app/services/loading/loading.service';
import { BreakfastService } from 'src/app/services/breakfast/breakfast.service';
import { LunchService } from 'src/app/services/lunch/lunch.service';
import { DinnerService } from 'src/app/services/dinner/dinner.service';
import { FoodsService } from 'src/app/services/food/foods.service';
import { FoodService } from 'src/app/services/food/food.service';
import { CartService } from 'src/app/services/cart/cart.service';
import { UserService } from 'src/app/services/user/user.service';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert/alert.service';
import { CardPreviewComponent } from '../card-preview/card-preview.component';

@Component({
  selector: 'app-menu-week',
  templateUrl: './menu-week.component.html',
  styleUrls: ['./menu-week.component.css'],
})
export class MenuWeekComponent implements OnInit, OnDestroy {
  isLoading: boolean = false;
  foodsList = [...Array(3).keys()]; // Esta línea crea una lista [0, 1, 2], ¿es necesario?
  textList = ['Desayuno', 'Almuerzo', 'Cena'];
  menus: Menu[] = [];
  selected = new FormControl(0);
  subscription: Subscription = new Subscription();
  breakfast: Breakfast = new Breakfast();
  lunch: Lunch = new Lunch();
  dinner: Dinner = new Dinner();

  constructor(
    public dialog: MatDialog,
    private menusService: MenusService,
    private loadingService: LoadingService,
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
    this.subscribeToMenus();
    this.subscribeToLoading();
    this.subscribeToMealServices();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private subscribeToMenus() {
    this.subscription.add(
      this.menusService.menus$.subscribe((menus: Menu[]) => {
        this.filterDates(menus);
      })
    );
    this.filterDates(this.menusService.menus); // También filtramos inmediatamente los menús actuales
  }

  private subscribeToLoading() {
    this.subscription.add(
      this.loadingService.loading$.subscribe((isLoading: boolean) => {
        this.isLoading = isLoading;
      })
    );
  }

  private subscribeToMealServices() {
    this.subscription.add(
      this.breakfastService.breakfast$.subscribe((breakfast: Breakfast) => {
        this.breakfast = breakfast;
      })
    );

    this.subscription.add(
      this.lunchService.lunch$.subscribe((lunch: Lunch) => {
        this.lunch = lunch;
      })
    );

    this.subscription.add(
      this.dinnerService.dinner$.subscribe((dinner: Dinner) => {
        this.dinner = dinner;
      })
    );
  }

  filterDates(menus: Menu[]) {
    const daysOfWeek = this.weekLabel(new Date());
    this.menus = menus.filter((menu: Menu) => {
      const date = moment(menu.fecha).format('DD-MM-YYYY');
      return daysOfWeek.includes(date);
    });

    this.sortMenusByDate();
    this.initMenu();
  }

  initMenu() {
    const todayWeekDay = moment().isoWeekday();
    this.menus.forEach((menu: Menu, index: number) => {
      const menuWeekDay = moment(menu.fecha).isoWeekday();
      if (menuWeekDay === todayWeekDay) {
        this.selected.setValue(index);
        this.showMenu(index);
      }
    });
  }

  getTextDay(fecha: any) {
    const weekDayNumber = moment(fecha).isoWeekday();
    switch (weekDayNumber) {
      case 1:
        return 'Lunes';
      case 2:
        return 'Martes';
      case 3:
        return 'Miércoles';
      case 4:
        return 'Jueves';
      case 5:
        return 'Viernes';
      case 6:
        return 'Sábado';
      case 7:
        return 'Domingo';
      default:
        return '';
    }
  }

  weekLabel(current: Date) {
    const week = [];
    const weekFormatted: string[] = [];

    if (current.getDay() === 0) {
      current.setDate(current.getDate() - 6);
    } else {
      current.setDate(current.getDate() - current.getDay() + 1);
    }

    for (let i = 0; i < 7; i++) {
      week.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }

    week.forEach((day) => {
      weekFormatted.push(moment(day).format('DD-MM-YYYY'));
    });

    return weekFormatted;
  }

  sortMenusByDate() {
    this.menus.sort((a: Menu, b: Menu) => {
      const dateA = moment(a.fecha).format('YYYYMMDD');
      const dateB = moment(b.fecha).format('YYYYMMDD');
      return dateA.localeCompare(dateB);
    });
  }

  setFoodList(menu: Menu) {
    this.breakfastService.getBreakfast(menu.idDesayunos);
    this.lunchService.getLunch(menu.idAlmuerzos);
    this.dinnerService.getDinner(menu.idCenas);
  }

  showMenu(index: number) {
    const menu = this.menus[index];
    this.setFoodList(menu);
  }

  getFoodList(option: number) {
    switch (option) {
      case 0:
        return this.breakfast.foods;
      case 1:
        return this.lunch.foods;
      case 2:
        return this.dinner.foods;
      default:
        return [];
    }
  }

  openDialog(food: any) {
    const dialogRef = this.dialog.open(CardPreviewComponent);
    this.showFood(food);

    dialogRef.afterClosed().subscribe((result) => {
      // Aquí puedes manejar la lógica después de cerrar el diálogo si es necesario
    });
  }

  showFood(food: any) {
    this.foodsService.getFood(food.id).subscribe((foodData: any) => {
      if (foodData.data()) {
        this.foodService.suscribeFood(foodData.data());
      }
    });
  }

  addFoodListToCart(menu: Menu, option: number) {
    let listId = '';
    let foodListLength = 0;

    switch (option) {
      case 0:
        listId = menu.idDesayunos;
        foodListLength = this.breakfast.foods.length;
        break;
      case 1:
        listId = menu.idAlmuerzos;
        foodListLength = this.lunch.foods.length;
        break;
      case 2:
        listId = menu.idCenas;
        foodListLength = this.dinner.foods.length;
        break;
      default:
        break;
    }

    if (this.userService.user.email) {
      if (foodListLength > 0) {
        this.cartService.addToCartList({
          fecha: moment(menu.fecha).format('LL'),
          idLista: listId,
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
