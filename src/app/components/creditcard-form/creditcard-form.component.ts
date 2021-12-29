import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { MyErrorStateMatcher } from 'src/app/models/MyErrorStateMatcher';
import { User } from 'src/app/models/user.model';
import { AlertService } from 'src/app/services/alert/alert.service';
import { CartService } from 'src/app/services/cart/cart.service';
import { LoadingService } from 'src/app/services/loading/loading.service';
import { RegisterService } from 'src/app/services/register/register.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-creditcard-form',
  templateUrl: './creditcard-form.component.html',
  styleUrls: ['./creditcard-form.component.css'],
})
export class CreditcardFormComponent implements OnInit {
  textList = ['Desayuno', 'Almuerzo', 'Cena'];
  form: FormGroup = new FormGroup({
    numeroTarjeta: new FormControl('', [Validators.required]),
    mesVencimiento: new FormControl('', [Validators.required]),
    añoVencimiento: new FormControl('', [Validators.required]),
    codigoSeguridad: new FormControl('', [Validators.required]),
  });
  matcher = new MyErrorStateMatcher();
  mesesIndex = [...Array(12).keys()];
  eras: number[] = [];
  cartList: any[] = [];
  user: User = new User();

  constructor(
    private cartService: CartService,
    private registerService: RegisterService,
    private userService: UserService,
    private alertService: AlertService,
    private route: Router,
    private loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    const dateActual = moment().format('YYYY');
    const indexes = [...Array(15).keys()];

    this.eras = indexes.map((index) => parseInt(dateActual) + index);

    this.cartService.cartList$.subscribe((cartListKey) => {
      this.cartList = cartListKey;
    });

    this.userService.user$.subscribe((userKey) => {
      this.user = userKey;
    });
  }

  get getForm() {
    return this.form.controls;
  }

  async submit() {
    const fechaActual = moment(this.cartList[0]?.fecha).format();

    if (this.cartList.length === 0) {
      await this.alertService.openSnackBar('❌ Carrito vacío ❌');
      await this.route.navigate(['shopping-cart']);
      return;
    }

    await this.cartList.forEach(async (purchaseKey) => {
      const index = this.textList.indexOf(purchaseKey?.textListFood);
      await this.registerService.addRegister({
        fecha: fechaActual,
        idUsuario: this.user.id,
        idDesayuno: index === 0 ? purchaseKey.idLista : '',
        idAlmuerzo: index === 1 ? purchaseKey.idLista : '',
        idCena: index === 2 ? purchaseKey.idLista : '',
      });
    });

    await this.alertService.openSnackBar('✅ Compra exitosa ✅');
    await this.route.navigate(['/registers']);
    await this.cartService.cleanCartList();
  }
}
