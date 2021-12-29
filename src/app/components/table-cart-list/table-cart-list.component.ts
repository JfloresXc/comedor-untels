import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { CartService } from 'src/app/services/cart/cart.service';

class Row {
  fecha: string = '';
  textListFood: string = '';
}

@Component({
  selector: 'app-table-cart-list',
  templateUrl: './table-cart-list.component.html',
  styleUrls: ['./table-cart-list.component.css'],
})
export class TableCartListComponent implements OnInit {
  @ViewChild(MatTable) tabla!: MatTable<Row>;
  cartList: any[] = [];
  displayedColumns: string[] = ['fecha', 'textListFood', 'buttonDelete'];

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.cartList$.subscribe((cartListKey: any[]) => {
      this.cartList = cartListKey;
      this.tabla?.renderRows();
    });
  }

  deleteRow(row: any) {
    this.cartService.deleteItem(row.idLista);
  }
}
