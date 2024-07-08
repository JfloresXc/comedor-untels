import { TestBed } from '@angular/core/testing';
import { MenuService } from './menu.service';
import Menu from 'src/app/models/menu.model';
import { BehaviorSubject } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { LoadingService } from '../loading/loading.service';

describe('MenuService', () => {
  let service: MenuService;
  let firestoreSpy: jasmine.SpyObj<AngularFirestore>;
  let loadingServiceSpy: jasmine.SpyObj<LoadingService>;

  beforeEach(() => {
    const firestoreSpyObj = jasmine.createSpyObj('AngularFirestore', ['collection', 'doc']);
    const loadingServiceSpyObj = jasmine.createSpyObj('LoadingService', ['hide']);

    TestBed.configureTestingModule({
      providers: [
        MenuService,
        { provide: AngularFirestore, useValue: firestoreSpyObj },
        { provide: LoadingService, useValue: loadingServiceSpyObj }
      ]
    });

    service = TestBed.inject(MenuService);
    firestoreSpy = TestBed.inject(AngularFirestore) as jasmine.SpyObj<AngularFirestore>;
    loadingServiceSpy = TestBed.inject(LoadingService) as jasmine.SpyObj<LoadingService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add menu to Firestore', () => {
    const menu: Menu = new Menu();

    service.addMenu(menu).then(() => {
      expect(firestoreSpy.collection('menus').add).toHaveBeenCalledWith(menu);
    });
  });

  it('should delete menu from Firestore', () => {
    const menuId = '1';

    service.deleteMenu(menuId).then(() => {
      expect(firestoreSpy.collection('menus').doc).toHaveBeenCalledWith(menuId);
      expect(firestoreSpy.collection('menus').doc(menuId).delete).toHaveBeenCalled();
    });
  });

  it('should get menu from Firestore and update BehaviorSubject', () => {
    const menuId = '1';
    const mockMenuData = { id: '1', name: 'Mock Menu', description: 'Mock menu data' };

    const menuDocSpy = jasmine.createSpyObj('AngularFirestoreDocument', ['get']);
    menuDocSpy.get.and.returnValue(Promise.resolve({ data: () => mockMenuData, id: menuId }));

    loadingServiceSpy.hide.and.callThrough();

    service.getMenu(menuId);

    expect(firestoreSpy.collection('menus').doc).toHaveBeenCalledWith(menuId);
    expect(menuDocSpy.get).toHaveBeenCalled();

    // Simulate Firestore response
    menuDocSpy.get().then(() => {
      expect(loadingServiceSpy.hide).toHaveBeenCalled();
    });
  });

  it('should update menu in Firestore', () => {
    const menuId = '1';
    const updatedData = { name: 'Updated Menu', description: 'Updated menu description' };


    service.updateMenu(menuId, updatedData).then(() => {
      expect(firestoreSpy.collection('menus').doc).toHaveBeenCalledWith(menuId);
      expect(firestoreSpy.collection('menus').doc(menuId).update).toHaveBeenCalledWith(updatedData);
    });
  });
});
