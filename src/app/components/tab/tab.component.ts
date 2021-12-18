import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import Food from 'src/app/models/food.model';
import Menu from 'src/app/models/menu.model';
import { AlertService } from 'src/app/services/alert/alert.service';
import { FoodsService } from 'src/app/services/food/foods.service';
import { LoadingService } from 'src/app/services/loading/loading.service';
import { MenuService } from 'src/app/services/menu/menu.service';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.css'],
})
export class TabComponent implements OnInit {
  foods: any[] = [];
  @Input() option: number = 0;
  @Input() foodLista: any[] = [{ nombre: '', id: '' }];
  @Input() control = new FormControl();
  @Output() propagar = new EventEmitter<string>();
  @Output() sendList = new EventEmitter<any[]>();
  foodsPreview: any[] = [];
  controlInputSearch = new FormControl();
  mensaje: string = '';

  constructor(
    private foodsService: FoodsService,
    private menuService: MenuService,
    private loadingService: LoadingService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.foodsService.foods$.subscribe((foodsKey) => {
      this.foods = foodsKey;
      this.foodsPreview = foodsKey;
    });
    this.menuService.menu$.subscribe((menuKey: Menu) => {
      const { desayunoIds, almuerzoIds, cenaIds } = menuKey;
      // if (this.option === 0) {
      //   this.foodLista = desayunoIds;
      // } else if (this.option === 1) {
      //   this.foodLista = almuerzoIds;
      // } else if (this.option === 2) {
      //   this.foodLista = cenaIds;
      // }
    });

    this.foods = this.foodsService.foods;
    this.foodsPreview = this.foodsService.foods;
  }

  onList() {
    this.sendList.emit(this.foodLista);
  }

  handleChangeFoods(value: any) {
    this.foodsPreview = this.foods.filter((food: Food) =>
      food.nombre.toLowerCase().includes(value)
    );
  }

  addToList() {
    if (!this.control.value || this.control.value.length === 0) {
      this.alertService.openSnackBar('❌ Debe seleccionar algún platillo ❌');
    } else {
      this.selectedTab();
      this.clear();
    }
  }

  selectedTab() {
    this.foodLista.push(...this.control.value);
  }

  clear() {
    this.control.setValue([]);
  }

  deleteFood(index: any) {
    this.foodLista = this.foodLista.filter((_, indexKey) => index !== indexKey);
    this.onList();
    this.alertService.openSnackBar('✅ Eliminado correctamente ✅');
  }

  addItems() {
    this.foodLista.push(...this.control.value);
    this.clear();
  }
}
