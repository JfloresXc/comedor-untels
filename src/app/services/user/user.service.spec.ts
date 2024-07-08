import { TestBed } from '@angular/core/testing';
import { UserService } from './user.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { BehaviorSubject } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { LoadingService } from '../loading/loading.service';
import { of } from 'rxjs';

describe('UserService', () => {
  let service: UserService;
  let angularFirestoreSpy: jasmine.SpyObj<AngularFirestore>;

  beforeEach(() => {
    const spyFirestore = jasmine.createSpyObj('AngularFirestore', [
      'collection',
      'doc',
    ]);
    TestBed.configureTestingModule({
      providers: [
        UserService,
        LoadingService,
        { provide: AngularFirestore, useValue: spyFirestore },
      ],
    });
    service = TestBed.inject(UserService);
    angularFirestoreSpy = TestBed.inject(AngularFirestore) as jasmine.SpyObj<
      AngularFirestore
    >;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add a user to Firestore', async () => {
    const user: User = { id: '1', email: 'test@example.com', rol: 'user' };
    const uid = 'user1';
    
    await service.addUser(user, uid);
  });

  it('should delete a user from Firestore', async () => {
    const id = '1';

    await service.deleteUser(id);

  });

  it('should get a user from Firestore', () => {
    const id = '1';
    const user: User = { id: '1', email: 'test@example.com', rol: 'user' };

    service.getUser(id);

    service.user$.subscribe((userData) => {
      expect(userData).toEqual(jasmine.objectContaining(user));
    });
  });

  it('should update a user in Firestore', async () => {
    const id = '1';
    const user: User = { id: '1', email: 'updated@example.com', rol: 'admin' };

    await service.updateUser(id, user);

  });

});
