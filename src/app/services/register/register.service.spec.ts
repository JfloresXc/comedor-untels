import { TestBed } from '@angular/core/testing';
import { RegisterService } from './register.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { BehaviorSubject } from 'rxjs';
import { LoadingService } from '../loading/loading.service';
import { Register } from 'src/app/models/register.model';

describe('RegisterService', () => {
  let service: RegisterService;
  let firestoreSpy: jasmine.SpyObj<AngularFirestore>;
  let loadingServiceSpy: jasmine.SpyObj<LoadingService>;

  beforeEach(() => {
    const firestoreSpyObj = jasmine.createSpyObj('AngularFirestore', ['collection', 'doc']);
    const loadingServiceSpyObj = jasmine.createSpyObj('LoadingService', ['hide']);

    TestBed.configureTestingModule({
      providers: [
        RegisterService,
        { provide: AngularFirestore, useValue: firestoreSpyObj },
        { provide: LoadingService, useValue: loadingServiceSpyObj }
      ]
    });

    service = TestBed.inject(RegisterService);
    firestoreSpy = TestBed.inject(AngularFirestore) as jasmine.SpyObj<AngularFirestore>;
    loadingServiceSpy = TestBed.inject(LoadingService) as jasmine.SpyObj<LoadingService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add register to Firestore', () => {
    const register: Register = new Register();

    service.addRegister(register).then(() => {
      expect(firestoreSpy.collection('registers').add).toHaveBeenCalledWith(register);
    });
  });

  it('should delete register from Firestore', () => {
    const registerId = '1';

    service.deleteRegister(registerId).then(() => {
      expect(firestoreSpy.collection('registers').doc).toHaveBeenCalledWith(registerId);
      expect(firestoreSpy.collection('registers').doc(registerId).delete).toHaveBeenCalled();
    });
  });

  it('should get register from Firestore and update BehaviorSubject', () => {
    const registerId = '1';
    const mockRegisterData = { id: '1', name: 'Mock Register', description: 'Mock register data' };

    const registerDocSpy = jasmine.createSpyObj('AngularFirestoreDocument', ['get']);
    registerDocSpy.get.and.returnValue(Promise.resolve({ data: () => mockRegisterData, id: registerId }));

    loadingServiceSpy.hide.and.callThrough();

    service.getRegister(registerId);

    expect(firestoreSpy.collection('registers').doc).toHaveBeenCalledWith(registerId);
    expect(registerDocSpy.get).toHaveBeenCalled();

    // Simulate Firestore response
    registerDocSpy.get().then(() => {
      expect(loadingServiceSpy.hide).toHaveBeenCalled();
    });
  });

  it('should update register in Firestore', () => {
    const registerId = '1';
    const updatedData = { name: 'Updated Register', description: 'Updated register description' };


    service.updateRegister(registerId, updatedData).then(() => {
      expect(firestoreSpy.collection('registers').doc).toHaveBeenCalledWith(registerId);
      expect(firestoreSpy.collection('registers').doc(registerId).update).toHaveBeenCalledWith(updatedData);
    });
  });

  it('should clean register BehaviorSubject and reset register object', () => {

    // Set initial state

    // Call clean method
    service.clean();

    expect(service.register$.getValue()).toEqual(new Register());
    expect(service.register).toEqual(new Register());
  });
});
