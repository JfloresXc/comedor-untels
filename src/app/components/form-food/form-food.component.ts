import { Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FoodsService } from 'src/app/services/foods.service';
import Food from 'src/app/models/food.model';

@Component({
  selector: 'app-form-food',
  templateUrl: './form-food.component.html',
  styleUrls: ['./form-food.component.css'],
})
export class FormFoodComponent implements OnInit {
  @Input() idEdit: any = null;
  textButtonSubmit = 'Agregar';
  form: FormGroup;
  food: Food = new Food();

  constructor(
    private _builder: FormBuilder,
    private foodsService: FoodsService,
    private router: Router
  ) {
    this.form = this._builder.group({
      nombre: ['', Validators.compose([Validators.required])],
      precio: ['', Validators.compose([Validators.required])],
      descripcion: ['', Validators.compose([Validators.required])],
      // file: ['', Validators.compose([Validators.required])],
    });
  }

  ngOnInit(): void {
    if (this.idEdit) {
      this.foodsService.getFood(this.idEdit).subscribe((food) => {
        const { nombre, descripcion, precio } = food.payload.data();

        this.form.controls?.nombre.setValue(nombre);
        this.form.controls?.descripcion.setValue(descripcion);
        this.form.controls?.precio.setValue(precio);
      });
      this.textButtonSubmit = 'Editar';
    }
  }

  addOrEdit() {
    const { nombre, precio, descripcion } = this.form.value;
    this.food = {
      nombre,
      precio,
      fecha: new Date().toLocaleDateString(),
      descripcion,
      urlImagen: '',
    };

    if (!this.idEdit) {
      this.foodsService
        .addFood(this.food)
        .then(() => {})
        .catch((error) => console.error(error));
    } else {
      this.foodsService
        .updateFood(this.idEdit, this.food)
        .then(() => {
          this.router.navigate(['/foods']);
        })
        .catch((error) => console.error(error));
    }

    this.form.reset();
    this.food = new Food();
  }

  handleChangeFile(e: any) {
    console.log(e.target.files);
  }
}
