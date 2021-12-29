import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { LoadingService } from '../loading/loading.service';
import Menu from '../../models/menu.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MenusService {
  menus$: Subject<Menu[]> = new Subject<Menu[]>();
  menus: Menu[] = [];
  loading: boolean = true;

  constructor(
    private firestore: AngularFirestore,
    private loadingService: LoadingService
  ) {
    this.loadingService.show();
    this.firestore
      .collection('menus')
      .snapshotChanges()
      .subscribe((menusKey = []) => {
        this.menus = [];
        menusKey.forEach((key: any) => {
          this.menus.push({
            ...key.payload.doc.data(),
            id: key.payload.doc.id,
          });
        });
        this.menus$.next(this.menus);
        this.loadingService.hide();
      });
  }
}
