import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

class CartItem {
  fecha: string = '';
  idLista: string = '';
  textListFood: string = '';
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartList: CartItem[] = [];
  cartList$: BehaviorSubject<CartItem[]> = new BehaviorSubject<CartItem[]>([]);

  constructor() {}

  suscribeCartList() {
    this.cartList$.next(this.cartList);
  }

  addToCartList(item: CartItem) {
    this.cartList.push(item);
    this.suscribeCartList();
  }

  deleteItem(idRow: any) {
    this.cartList = this.cartList.filter(
      (itemKey: CartItem) => itemKey.idLista !== idRow
    );
    this.suscribeCartList();
  }

  cleanCartList() {
    this.cartList = [];
    this.suscribeCartList();
  }
}
