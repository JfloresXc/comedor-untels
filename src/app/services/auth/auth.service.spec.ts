import { TestBed } from '@angular/core/testing';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { AlertService } from '../alert/alert.service';
import { LoadingService } from '../loading/loading.service';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { User } from 'src/app/models/user.model';

describe('AuthService', () => {
  let service: AuthService;
  let angularFireAuthMock: any;
  let routerMock: any;
  let alertServiceMock: any;
  let userServiceMock: any;
  let loadingServiceMock: any;

  beforeEach(() => {
    angularFireAuthMock = {
      signInWithEmailAndPassword: jasmine.createSpy('signInWithEmailAndPassword').and.returnValue(Promise.resolve({ user: { uid: '12345' } })),
      createUserWithEmailAndPassword: jasmine.createSpy('createUserWithEmailAndPassword').and.returnValue(Promise.resolve({ user: { uid: '12345' } })),
      signOut: jasmine.createSpy('signOut').and.returnValue(Promise.resolve())
    };

    routerMock = {
      navigate: jasmine.createSpy('navigate').and.returnValue(Promise.resolve())
    };

    alertServiceMock = {
      openSnackBar: jasmine.createSpy('openSnackBar').and.returnValue(Promise.resolve())
    };

    userServiceMock = {
      getUser: jasmine.createSpy('getUser').and.returnValue(Promise.resolve()),
      addUser: jasmine.createSpy('addUser').and.returnValue(Promise.resolve()),
      suscribeUser: jasmine.createSpy('suscribeUser').and.returnValue(Promise.resolve()),
      user: new User()
    };

    loadingServiceMock = {
      show: jasmine.createSpy('show').and.returnValue(Promise.resolve())
    };

    TestBed.configureTestingModule({
      providers: [
        AuthService,
        { provide: AngularFireAuth, useValue: angularFireAuthMock },
        { provide: Router, useValue: routerMock },
        { provide: AlertService, useValue: alertServiceMock },
        { provide: UserService, useValue: userServiceMock },
        { provide: LoadingService, useValue: loadingServiceMock }
      ]
    });

    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#login should login user and set isLogged to true', async () => {
    await service.login('test@example.com', 'password');
    expect(angularFireAuthMock.signInWithEmailAndPassword).toHaveBeenCalledWith('test@example.com', 'password');
    expect(service.isLogged).toBeTrue();
    expect(localStorage.getItem('userId')).toEqual('12345');
    expect(userServiceMock.getUser).toHaveBeenCalledWith('12345');
    expect(alertServiceMock.openSnackBar).toHaveBeenCalledWith('✅ Bienvenido, compañero  ✅');
    expect(routerMock.navigate).toHaveBeenCalledWith(['/']);
  });

  it('#register should register user and show success snackbar', async () => {
    await service.register('test@example.com', 'password', 'user');
    expect(angularFireAuthMock.createUserWithEmailAndPassword).toHaveBeenCalledWith('test@example.com', 'password');
    expect(alertServiceMock.openSnackBar).toHaveBeenCalledWith('✅ Registrado correctamente  ✅');
    expect(userServiceMock.addUser).toHaveBeenCalledWith({ id: '12345', rol: 'user', email: 'test@example.com' }, '12345');
  });

  it('#logout should logout user and clear isLogged', async () => {
    await service.logout();
    expect(angularFireAuthMock.signOut).toHaveBeenCalled();
    expect(service.isLogged).toBeFalse();
    expect(localStorage.getItem('userId')).toBeNull();
    expect(userServiceMock.suscribeUser).toHaveBeenCalledWith(new User());
    expect(routerMock.navigate).toHaveBeenCalledWith(['/']);
  });

  it('#handleErrors should call openSnackBar with correct messages', () => {
    service.handleErrors({ code: 'auth/wrong-password' });
    expect(alertServiceMock.openSnackBar).toHaveBeenCalledWith('❌ Contraseña incorrecta ❌');

    service.handleErrors({ code: 'auth/invalid-email' });
    expect(alertServiceMock.openSnackBar).toHaveBeenCalledWith('❌ Correo electrónico no encontrado ❌');

    service.handleErrors({ code: 'auth/too-many-requests' });
    expect(alertServiceMock.openSnackBar).toHaveBeenCalledWith('❌ Muchos intentos, inténtalo más tarde ❌');

    service.handleErrors({ code: 'auth/email-already-in-use' });
    expect(alertServiceMock.openSnackBar).toHaveBeenCalledWith('❌ Correo electrónico en uso ❌');
  });

  it('#login should handle errors', async () => {
    angularFireAuthMock.signInWithEmailAndPassword.and.returnValue(Promise.reject({ code: 'auth/wrong-password' }));
    await service.login('test@example.com', 'wrongpassword');
    expect(alertServiceMock.openSnackBar).toHaveBeenCalledWith('❌ Contraseña incorrecta ❌');
  });

  it('#register should handle errors', async () => {
    angularFireAuthMock.createUserWithEmailAndPassword.and.returnValue(Promise.reject({ code: 'auth/email-already-in-use' }));
    await service.register('test@example.com', 'password', 'user');
    expect(alertServiceMock.openSnackBar).toHaveBeenCalledWith('❌ Correo electrónico en uso ❌');
  });
});
