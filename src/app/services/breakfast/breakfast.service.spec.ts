import { TestBed } from '@angular/core/testing';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { RouterTestingModule } from '@angular/router/testing';
import { BehaviorSubject, of } from 'rxjs';
import { LoadingService } from '../loading/loading.service';
import { BreakfastService } from './breakfast.service';
import Breakfast from 'src/app/models/breakfast.model';

describe('BreakfastService', () => {
  let service: BreakfastService;
  let angularFirestoreMock: any;
  let routerMock: any;

  beforeEach(() => {
    angularFirestoreMock = {
      collection: () => ({
        add: jasmine.createSpy('add').and.returnValue(Promise.resolve()),
        doc: jasmine.createSpy('doc').and.returnValue({
          delete: jasmine.createSpy('delete').and.returnValue(Promise.resolve()),
          get: jasmine.createSpy('get').and.returnValue(of({ exists: true, data: () => ({ id: '123', name: 'Omelette' }) }))
        })
      })
    };

    routerMock = {
      navigate: jasmine.createSpy('navigate').and.returnValue(true)
    };

    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        BreakfastService,
        { provide: AngularFirestore, useValue: angularFirestoreMock },
        { provide: LoadingService, useValue: {} },
      ]
    });

    service = TestBed.inject(BreakfastService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#addBreakfast should add a breakfast', async () => {
    const breakfast: Breakfast = new Breakfast();
    await service.addBreakfast(breakfast);
    expect(angularFirestoreMock.collection().add).toHaveBeenCalledWith(breakfast);
  });

  it('#deleteBreakfast should delete a breakfast', async () => {
    const id = '123';
    await service.deleteBreakfast(id);
    expect(angularFirestoreMock.collection().doc).toHaveBeenCalledWith(id);
    expect(angularFirestoreMock.collection().doc(id).delete).toHaveBeenCalled();
  });

  it('#getBreakfast should get a breakfast', () => {
    const id = '123';
    service.getBreakfast(id);
    expect(angularFirestoreMock.collection().doc).toHaveBeenCalledWith(id);
  });

  it('#getBreakfast should navigate to /menu if breakfast does not exist', () => {
    angularFirestoreMock.collection().doc.and.returnValue({
      get: jasmine.createSpy('get').and.returnValue(of({ exists: false }))
    });

    const id = '456';
    service.getBreakfast(id);
    expect(routerMock.navigate).toHaveBeenCalledWith(['/menu']);
  });

  it('#updateBreakfast should update a breakfast', async () => {
    const id = '123';
    const data = { name: 'Scrambled Eggs' };
    await service.updateBreakfast(id, data);
    expect(angularFirestoreMock.collection().doc).toHaveBeenCalledWith(id);
    expect(angularFirestoreMock.collection().doc(id).update).toHaveBeenCalledWith(data);
  });
});
