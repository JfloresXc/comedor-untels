import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import Menu from '../../models/menu.model';
import { BehaviorSubject } from 'rxjs';
import { LoadingService } from '../loading/loading.service';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  menu: Menu = new Menu();
  menu$: BehaviorSubject<Menu> = new BehaviorSubject<Menu>(new Menu());

  constructor(
    private firestore: AngularFirestore,
    private loadingService: LoadingService
  ) {}

  addMenu(menu: Menu): Promise<any> {
    return this.firestore.collection('menus').add(menu);
  }

  deleteMenu(id: string): Promise<any> {
    return this.firestore.collection('menus').doc(id).delete();
  }

  getMenu(id: string) {
    return this.firestore
      .collection('menus')
      .doc(id)
      .get()
      .subscribe((menuKey: any) => {
        const id = menuKey.id;

        if (menuKey.data()) {
          this.menu$.next({ ...menuKey.data(), id });
          this.loadingService.hide();
        }
      });
  }

  updateMenu(id: string, data: any): Promise<any> {
    return this.firestore.collection('menus').doc(id).update(data);
  }
}
