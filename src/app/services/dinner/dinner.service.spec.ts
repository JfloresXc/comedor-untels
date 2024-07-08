import { TestBed } from '@angular/core/testing';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { RouterTestingModule } from '@angular/router/testing';
import { BehaviorSubject } from 'rxjs';
import { DinnerService } from './dinner.service';

describe('DinnerService', () => {
  let service: DinnerService;
  let firestoreSpy: jasmine.SpyObj<AngularFirestore>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('AngularFirestore', ['collection', 'doc', 'get', 'add', 'delete', 'update']);

    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        DinnerService,
        { provide: AngularFirestore, useValue: spy }
      ]
    });
    service = TestBed.inject(DinnerService);
    firestoreSpy = TestBed.inject(AngularFirestore) as jasmine.SpyObj<AngularFirestore>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
