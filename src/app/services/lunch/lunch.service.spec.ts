import { TestBed } from '@angular/core/testing';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { RouterTestingModule } from '@angular/router/testing';
import { BehaviorSubject } from 'rxjs';
import Lunch from 'src/app/models/lunch.model';
import { LunchService } from './lunch.service';

describe('LunchService', () => {
  let service: LunchService;
  let firestoreSpy: jasmine.SpyObj<AngularFirestore>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('AngularFirestore', ['collection', 'doc', 'get', 'add', 'delete', 'update']);

    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        LunchService,
        { provide: AngularFirestore, useValue: spy }
      ]
    });
    service = TestBed.inject(LunchService);
    firestoreSpy = TestBed.inject(AngularFirestore) as jasmine.SpyObj<AngularFirestore>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add a lunch', () => {
    const dummyLunch: Lunch = { id: '1', foods: [{ id: '1', nombre: 'Dummy Food' }] };
    
    service.addLunch(dummyLunch).then(() => {
    });
  });

  it('should delete a lunch', () => {
    
    service.deleteLunch('1').then(() => {
    });
  });

  it('should get a lunch by id', () => {
    const dummyData = { id: '1', foods: [{ id: '1', nombre: 'Dummy Food' }] };
      
  });

  it('should update a lunch', () => {
    const dummyData = { foods: [{ id: '1', nombre: 'Updated Food' }] };
    
  });
});
