import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from 'src/app/firebase';
import { FoodService } from 'src/app/services/food/food.service';
import { FoodsService } from 'src/app/services/food/foods.service';
import { LoadingService } from 'src/app/services/loading/loading.service';
import Food from 'src/app/models/food.model';
import Utils from 'src/app/utils';

@Component({
  selector: 'app-form-food',
  templateUrl: './form-food.component.html',
  styleUrls: ['./form-food.component.css'],
})
export class FormFoodComponent implements OnInit {
  @Input() idEdit: any = null;
  @Input() foodPreview: Food = new Food();
  formGroup: FormGroup;
  fileLocal: File = new File([], '');
  textButtonSubmit = 'Agregar';
  util: Utils = new Utils();

  constructor(
    private foodsService: FoodsService,
    private foodService: FoodService,
    private loadingService: LoadingService,
    private router: Router
  ) {
    this.formGroup = this.util.getFoodFormFood();
    this.util.getFileDefault().then((blob: any) => {
      this.fileLocal = this.util.blobToFile({ theBlob: blob });
    });
  }

  ngOnInit(): void {
    if (this.idEdit) {
      this.foodService.get$Food().subscribe((food: Food) => {
        this.foodPreview = food;
        const { nombre, precio, descripcion } = this.foodPreview;
        this.formGroup.controls?.nombre.setValue(nombre);
        this.formGroup.controls?.descripcion.setValue(descripcion);
        this.formGroup.controls?.precio.setValue(precio);
        this.textButtonSubmit = 'Editar';
      });
    }
  }

  async addOrEdit() {
    this.loadingService.show();
    try {
      await this.router.navigate(['/foods']);
      if (!this.idEdit) await this.addFood();
      else await this.editFood();
    } catch (error) {
      console.error('Error al agregar o editar comida:', error);
    } finally {
      this.loadingService.hide();
    }
  }

  async addFood() {
    const fileRef = ref(storage, `menu/${this.fileLocal?.name}`);
    await uploadBytes(fileRef, this.fileLocal);
    this.foodPreview.nombreImagen = this.fileLocal.name;
    this.foodPreview.urlImagen = await getDownloadURL(fileRef);
    await this.foodsService.addFood({ ...this.foodPreview });
  }

  async editFood() {
    await this.foodsService.updateFood(this.idEdit, { ...this.foodPreview });
  }

  handleChange(detail: any) {
    const { name, value } = detail;
    switch (name) {
      case 'nombre':
        this.foodPreview.nombre = value;
        break;
      case 'descripcion':
        this.foodPreview.descripcion = value;
        break;
      case 'precio':
        this.foodPreview.precio = value;
        break;
      default:
        break;
    }
  }

  handleChangeFile(event: any) {
    const files = event.target.files;
    const reader = new FileReader();

    reader.onload = async (event: ProgressEvent) => {
      this.foodPreview.urlImagen = (<FileReader>event.target).result;
      this.fileLocal = files[0];
    };

    if (files && files[0]) {
      reader.readAsDataURL(event.target.files[0]);
    }
  }
}
