import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import Menu from '../../models/menu.model';
import { Observable, Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  menu: Menu = new Menu();
  menu$: BehaviorSubject<Menu> = new BehaviorSubject<Menu>(new Menu());

  constructor(private firestore: AngularFirestore) {}

  addMenu(menu: Menu): Promise<any> {
    return this.firestore.collection('menus').add(menu);
  }

  deleteMenu(id: string): Promise<any> {
    return this.firestore.collection('menus').doc(id).delete();
  }

  getMenu(id: string): Observable<any> {
    return this.firestore.collection('menus').doc(id).get();
  }

  updateMenu(id: string, data: any): Promise<any> {
    return this.firestore.collection('menus').doc(id).update(data);
  }
}
