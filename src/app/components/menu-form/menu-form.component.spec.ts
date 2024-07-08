import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { Moment } from 'moment';
import { Subscription } from 'rxjs';

import { DateService } from './../../services/date/date.service';
import { MenuService } from './../../services/menu/menu.service';
import { LoadingService } from 'src/app/services/loading/loading.service';
import { AlertService } from 'src/app/services/alert/alert.service';
import { BreakfastService } from 'src/app/services/breakfast/breakfast.service';
import { LunchService } from 'src/app/services/lunch/lunch.service';
import { DinnerService } from 'src/app/services/dinner/dinner.service';

import Menu from 'src/app/models/menu.model';
import Breakfast from 'src/app/models/breakfast.model';
import Lunch from 'src/app/models/lunch.model';
import Dinner from 'src/app/models/dinner.model';
import Food from 'src/app/models/food.model'; // Assuming Food model definition

@Component({
  selector: 'app-menu-form',
  templateUrl: './menu-form.component.html',
  styleUrls: ['./menu-form.component.css'],
})
export class MenuFormComponent implements OnInit, OnDestroy {
  @Input() idEdit: any = null;
  @Input() foods: any[] = [];
  subscription: Subscription = new Subscription();
  formGroup: FormGroup;
  date: string = '';
  menu: Menu = new Menu();
  breakfast: Breakfast = new Breakfast();
  lunch: Lunch = new Lunch();
  dinner: Dinner = new Dinner();

  foodsOfDay = {
    desayunoLista: [] as Food[],
    almuerzoLista: [] as Food[],
    cenaLista: [] as Food[],
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
    this.formGroup = new FormGroup({});
    this.idEdit = this.activatedRoute.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    if (this.idEdit) {
      this.initEdit();
    } else {
      this.initAdd();
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public get controls() {
    return this.formGroup.controls;
  }

  public async initEdit() {
    try {
      const menu = await this.menuService.getMenu(this.idEdit);
      this.date = this.menu.fecha;

      if (this.menu.idDesayunos) {
        const breakfast = await this.breakfastService.getBreakfast(this.menu.idDesayunos);
      }

      if (this.menu.idAlmuerzos) {
        const lunch = await this.lunchService.getLunch(this.menu.idAlmuerzos);
      }

      if (this.menu.idCenas) {
        const dinner = await this.dinnerService.getDinner(this.menu.idCenas);
      }
    } catch (error) {
      console.error('Error al inicializar la edición del menú:', error);
      this.alertService.openSnackBar('Error al cargar los datos del menú.');
    }
  }

  public async initAdd() {
    try {
      const dateKey: any = await this.dateService.getDate();
      this.date = dateKey.format();
      this.setValuesFoodsOfDay();
    } catch (error) {
      console.error('Error al inicializar la creación del menú:', error);
      this.alertService.openSnackBar('Error al obtener la fecha actual.');
    }
  }

  public async addListsToMenu() {
    this.breakfast.foods = this.foodsOfDay.desayunoLista;
    this.lunch.foods = this.foodsOfDay.almuerzoLista;
    this.dinner.foods = this.foodsOfDay.cenaLista;
  }

  public setValuesFoodsOfDay() {
    this.foodsOfDay = {
      desayunoLista: [],
      almuerzoLista: [],
      cenaLista: [],
    };
  }

  public setList(list: Food[], option: number) {
    switch (option) {
      case 0:
        this.foodsOfDay.desayunoLista = list;
        break;
      case 1:
        this.foodsOfDay.almuerzoLista = list;
        break;
      case 2:
        this.foodsOfDay.cenaLista = list;
        break;
      default:
        break;
    }
  }

  public async addMenu() {
    try {
      if (!this.date) {
        this.alertService.openSnackBar('Debe seleccionar una fecha.');
        return;
      }

      this.menu.fecha = moment(this.date).format();
      this.addListsToMenu();

      const breakfastResponse = await this.breakfastService.addBreakfast({ ...this.breakfast });
      const lunchResponse = await this.lunchService.addLunch({ ...this.lunch });
      const dinnerResponse = await this.dinnerService.addDinner({ ...this.dinner });

      this.menu.idDesayunos = breakfastResponse?.id;
      this.menu.idAlmuerzos = lunchResponse?.id;
      this.menu.idCenas = dinnerResponse?.id;

      await this.menuService.addMenu(this.menu);
      this.loadingService.hide();
      this.alertService.openSnackBar('Menú agregado satisfactoriamente.');
      this.router.navigate(['/menu']);
    } catch (error) {
      console.error('Error al agregar el menú:', error);
      this.loadingService.hide();
      this.alertService.openSnackBar('Error al agregar el menú.');
    }
  }

  public async editMenu() {
    try {
      this.addListsToMenu();

      await this.breakfastService.updateBreakfast(this.menu.idDesayunos, { ...this.breakfast });
      await this.lunchService.updateLunch(this.menu.idAlmuerzos, { ...this.lunch });
      await this.dinnerService.updateDinner(this.menu.idCenas, { ...this.dinner });

      await this.menuService.updateMenu(this.menu.id, {
        fecha: this.menu.fecha,
        idDesayunos: this.menu.idDesayunos,
        idAlmuerzos: this.menu.idAlmuerzos,
        idCenas: this.menu.idCenas,
      });

      this.loadingService.hide();
      this.alertService.openSnackBar('Menú editado satisfactoriamente.');
      this.router.navigate(['/menu']);
    } catch (error) {
      console.error('Error al editar el menú:', error);
      this.loadingService.hide();
      this.alertService.openSnackBar('Error al editar el menú.');
    }
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
