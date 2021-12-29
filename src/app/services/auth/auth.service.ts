import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { AlertService } from '../alert/alert.service';
import { LoadingService } from '../loading/loading.service';
import { UserService } from '../user/user.service';

const CODE_ERROR_PASSWORD = 'auth/wrong-password';
const CODE_ERROR_EMAIL = 'auth/invalid-email';
const CODE_ERROR_TIME = 'auth/too-many-requests';
const CODE_ERROR_USER = 'auth/user-not-found';
const CODE_ERROR_EMAIL_IN_USE = 'auth/email-already-in-use';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLogged: boolean = false;
  isLogged$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private angularFireAuth: AngularFireAuth,
    private router: Router,
    private alertService: AlertService,
    private userService: UserService,
    private loadingService: LoadingService
  ) {}

  public suscribeLogged(value: boolean) {
    this.isLogged$.next(value);
    this.isLogged = value;
  }

  public async login(email: string, password: string) {
    this.loadingService.show();
    try {
      const { user } = await this.angularFireAuth.signInWithEmailAndPassword(
        email,
        password
      );

      if (user) {
        this.suscribeLogged(true);
        localStorage.setItem('userId', user.uid);
        await this.userService.getUser(user.uid);
        await this.alertService.openSnackBar('✅ Bienvenido, compañero  ✅');
        await this.router.navigate(['/']);
      }
      return user;
    } catch (error) {
      this.handleErrors(error);
      return;
    }
  }

  public async register(email: string, password: string, rol: string) {
    try {
      const { user } =
        await this.angularFireAuth.createUserWithEmailAndPassword(
          email,
          password
        );

      if (user) {
        await this.alertService.openSnackBar('✅ Registrado correctamente  ✅');
        await this.userService.addUser({ id: user.uid, rol, email }, user.uid);
      }
      return user;
    } catch (error) {
      this.handleErrors(error);
      return;
    }
  }

  // HIPOTESIS: EL LOGOUT ACTUALIZA TODOS LOS SUSCRIBE EN ONSNAPSHOT
  public logout() {
    this.angularFireAuth
      .signOut()
      .then(() => {
        localStorage.removeItem('userId');
        this.suscribeLogged(false);
        this.userService.suscribeUser(new User());
        this.router.navigate(['/']);
      })
      .catch((err) => {
        console.log('Something went wrong: ', err.message);
      });
  }

  public handleErrors(error: any) {
    if (CODE_ERROR_PASSWORD === error.code) {
      this.alertService.openSnackBar('❌ Contraseña incorrecta ❌');
    } else if (
      CODE_ERROR_EMAIL === error.code ||
      CODE_ERROR_USER == error.code
    ) {
      this.alertService.openSnackBar('❌ Correo electrónico no encontrado ❌');
    } else if (CODE_ERROR_TIME === error.code) {
      this.alertService.openSnackBar(
        '❌ Muchos intentos, inténtalo más tarde ❌'
      );
    } else if (CODE_ERROR_EMAIL_IN_USE === error.code) {
      this.alertService.openSnackBar('❌ Correo electrónico en uso ❌');
    }
  }
}
