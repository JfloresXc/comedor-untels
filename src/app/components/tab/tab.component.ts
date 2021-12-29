import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import Food from 'src/app/models/food.model';
import { CardPreviewComponent } from '../card-preview/card-preview.component';
import { MatDialog } from '@angular/material/dialog';
import { AlertService } from 'src/app/services/alert/alert.service';
import { FoodsService } from 'src/app/services/food/foods.service';
import { FoodService } from 'src/app/services/food/food.service';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.css'],
})
export class TabComponent implements OnInit {
  @Input() option: number = 0;
  @Input() foodLista: any[] = [{ nombre: '', id: '' }];
  @Input() control = new FormControl();
  @Output() propagar = new EventEmitter<string>();
  @Output() sendList = new EventEmitter<any[]>();
  foods: any[] = [];
  foodsPreview: any[] = [];
  controlInputSearch = new FormControl();

  constructor(
    private foodsService: FoodsService,
    private foodService: FoodService,
    private alertService: AlertService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.foodsService.foods$.subscribe((foodsKey) => {
      this.foods = foodsKey;
      this.foodsPreview = foodsKey;
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
}
