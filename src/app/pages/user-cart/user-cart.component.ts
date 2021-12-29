import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart/cart.service';

class CartItem {
  fecha: string = '';
  idLista: string = '';
  textListFood: string = '';
}

@Component({
  selector: 'app-user-cart',
  templateUrl: './user-cart.component.html',
  styleUrls: ['./user-cart.component.css'],
})
export class UserCartComponent implements OnInit {
  // cartList: CartItem[] = [];

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    // this.cartService.cartList$.subscribe((cartListKey) => {
    //   this.cartList = cartListKey;
    // });
  }
}
