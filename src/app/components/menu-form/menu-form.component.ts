import { DateService } from './../../services/date/date.service';
import { MenuService } from './../../services/menu/menu.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FoodsService } from 'src/app/services/food/foods.service';
import { LoadingService } from 'src/app/services/loading/loading.service';
import { AlertService } from 'src/app/services/alert/alert.service';
import Menu from 'src/app/models/menu.model';
import Utils from '../../utils';
import Food from 'src/app/models/food.model';
import * as moment from 'moment';
import { Moment } from 'moment';
import { ActivatedRoute, Router } from '@angular/router';

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
  selected = new FormControl(0);
  foodsOfDay = {
    desayunoLista: [{ nombre: '', id: '' }],
    almuerzoLista: [{ nombre: '', id: '' }],
    cenaLista: [{ nombre: '', id: '' }],
  };

  constructor(
    private foodsService: FoodsService,
    private menuService: MenuService,
    private loadingService: LoadingService,
    private activatedRoute: ActivatedRoute,
    private dateService: DateService,
    private router: Router,
    private alertService: AlertService
  ) {
    this.formGroup = this.util.getFoodFormMenu();
    this.idEdit = this.activatedRoute.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    if (this.idEdit) {
      this.menuService.menu$.subscribe((menuKey) => {
        this.menu = menuKey;
        this.date = this.menu.fecha;
        this.setValuesFoodsOfDay();
      });
    } else {
      this.setValuesFoodsOfDay();
      this.dateService.getDate().subscribe((dateKey: Moment) => {
        this.date = dateKey.format();
      });
    }
    this.loadingService.hide();
  }

  ngOnDestroy(): void {
    this.suscription.unsubscribe();
  }

  public get controls() {
    return this.formGroup.controls;
  }

  public setValuesMenu() {
    const { desayunoLista, almuerzoLista, cenaLista } = this.foodsOfDay;
    this.menu.desayunoIds = desayunoLista;
    this.menu.almuerzoIds = almuerzoLista;
    this.menu.cenaIds = cenaLista;
  }

  public setValuesFoodsOfDay() {
    if (this.idEdit) {
      this.foodsOfDay = {
        desayunoLista: this.menu.desayunoIds,
        almuerzoLista: this.menu.almuerzoIds,
        cenaLista: this.menu.cenaIds,
      };
    } else {
      this.foodsOfDay = {
        desayunoLista: [],
        almuerzoLista: [],
        cenaLista: [],
      };
    }
  }

  setList(list: any[], option: number) {
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
      this.setValuesMenu();
      this.menu.fecha = moment(this.date).format();

      this.alertService.openSnackBar('✅ Agregado satisfactoriamente ✅');
      await this.menuService.addMenu({ ...this.menu });
      await this.router.navigate(['/menu']);
    }
  }

  async editMenu() {
    this.setValuesMenu();
    await this.menuService.updateMenu(this.idEdit, { ...this.menu });
    await this.router.navigate(['/menu']);
  }

  async addOrEditMenu() {
    if (!this.idEdit) {
      await this.addMenu();
    } else {
      await this.editMenu();
    }
  }

  showPreviewFood(food: any) {
    const { index } = food;
    const { id } = food?.desayuno;
  }
}
