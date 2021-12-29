import { FormControl, FormGroup } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { Moment } from 'moment';
import { Subscription } from 'rxjs';

import { DateService } from './../../services/date/date.service';
import { MenuService } from './../../services/menu/menu.service';
import { FoodsService } from 'src/app/services/food/foods.service';
import { LoadingService } from 'src/app/services/loading/loading.service';
import { AlertService } from 'src/app/services/alert/alert.service';
import { BreakfastService } from 'src/app/services/breakfast/breakfast.service';

import Menu from 'src/app/models/menu.model';
import Utils from '../../utils';
import Breakfast from 'src/app/models/breakfast.model';
import Lunch from 'src/app/models/lunch.model';
import Dinner from 'src/app/models/dinner.model';
import { LunchService } from 'src/app/services/lunch/lunch.service';
import { DinnerService } from 'src/app/services/dinner/dinner.service';

@Component({
  selector: 'app-menu-form',
  templateUrl: './menu-form.component.html',
  styleUrls: ['./menu-form.component.css'],
})
export class MenuFormComponent implements OnInit {
  @Input() idEdit: any = null;
  @Input() foods: any[] = [];
  suscription: Subscription = new Subscription();
  formGroup: FormGroup;
  date: string = '';
  util: Utils = new Utils();
  menu: Menu = new Menu();
  breakfast: Breakfast = new Breakfast();
  lunch: Lunch = new Lunch();
  dinner: Dinner = new Dinner();

  selected = new FormControl(0);
  foodsOfDay = {
    desayunoLista: new Breakfast().foods,
    almuerzoLista: new Breakfast().foods,
    cenaLista: new Breakfast().foods,
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private dateService: DateService,
    private menuService: MenuService,
    private loadingService: LoadingService,
    private alertService: AlertService,
    private breakfastService: BreakfastService,
    private lunchService: LunchService,
    private dinnerService: DinnerService
  ) {
    this.formGroup = this.util.getFoodFormMenu();
    this.idEdit = this.activatedRoute.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    if (this.idEdit) this.initEdit();
    else this.initAdd();
  }

  ngOnDestroy(): void {
    this.suscription.unsubscribe();
  }

  public get controls() {
    return this.formGroup.controls;
  }

  public initEdit() {
    this.menuService.menu$.subscribe((menuKey) => {
      this.menu = menuKey;
      if (this.menu.fecha) {
        this.breakfastService.getBreakfast(this.menu.idDesayunos);
        this.lunchService.getLunch(this.menu.idAlmuerzos);
        this.dinnerService.getDinner(this.menu.idCenas);
      }

      this.date = this.menu.fecha;
    });

    this.breakfastService.breakfast$.subscribe((breakfastKey) => {
      this.breakfast = breakfastKey;
      if (this.breakfast.id) this.setValuesFoodsOfDay();
    });

    this.lunchService.lunch$.subscribe((lunchKey) => {
      this.lunch = lunchKey;
      if (this.lunch.id) this.setValuesFoodsOfDay();
    });

    this.dinnerService.dinner$.subscribe((dinnerKey) => {
      this.dinner = dinnerKey;
      if (this.dinner.id) this.setValuesFoodsOfDay();
    });
  }

  public initAdd() {
    this.setValuesFoodsOfDay();
    this.dateService.getDate().subscribe((dateKey: Moment) => {
      this.date = dateKey.format();
    });
  }

  public async addListsToMenu() {
    const { desayunoLista, almuerzoLista, cenaLista } = this.foodsOfDay;
    this.breakfast.foods = desayunoLista;
    this.lunch.foods = almuerzoLista;
    this.dinner.foods = cenaLista;
  }

  public setValuesFoodsOfDay() {
    this.foodsOfDay = {
      desayunoLista: this.idEdit ? this.breakfast.foods : [],
      almuerzoLista: this.idEdit ? this.lunch.foods : [],
      cenaLista: this.idEdit ? this.dinner.foods : [],
    };
  }

  public setList(list: any[], option: number) {
    if (option === 0) {
      this.foodsOfDay.desayunoLista = list;
    } else if (option === 1) {
      this.foodsOfDay.almuerzoLista = list;
    } else if (option === 2) {
      this.foodsOfDay.cenaLista = list;
    }
  }

  async addMenu() {
    if (!this.date) {
      this.alertService.openSnackBar('❌ Debe seleccionar una fecha ❌');
    } else {
      this.menu.fecha = moment(this.date).format();
      this.addListsToMenu();

      const breakfastResponse = await this.breakfastService.addBreakfast({
        ...this.breakfast,
      });
      const lunchResponse = await this.lunchService.addLunch({ ...this.lunch });
      const dinnerResponse = await this.dinnerService.addDinner({
        ...this.dinner,
      });

      this.menu.idDesayunos = breakfastResponse?.id;
      this.menu.idAlmuerzos = lunchResponse?.id;
      this.menu.idCenas = dinnerResponse?.id;

      await this.menuService.addMenu({ ...this.menu });
      await this.loadingService.hide();
      await this.alertService.openSnackBar('✅ Agregado satisfactoriamente ✅');
      await this.router.navigate(['/menu']);
    }
  }

  public async editMenu() {
    this.addListsToMenu();

    await this.breakfastService.updateBreakfast(this.menu.idDesayunos, {
      ...this.breakfast,
    });
    await this.lunchService.updateLunch(this.menu.idAlmuerzos, {
      ...this.lunch,
    });
    await this.dinnerService.updateDinner(this.menu.idCenas, {
      ...this.dinner,
    });
    await this.loadingService.hide();
    await this.alertService.openSnackBar('✅ Editado satisfactoriamente ✅');
    await this.router.navigate(['/menu']);
  }

  public async addOrEditMenu() {
    this.loadingService.show();
    if (!this.idEdit) {
      await this.addMenu();
    } else {
      await this.editMenu();
    }
  }
}
