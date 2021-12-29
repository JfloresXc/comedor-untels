import { Component, OnInit } from '@angular/core';
import { ErrorService } from './services/error/error.service';
import { LoadingService } from './services/loading/loading.service';
import { AlertService } from './services/alert/alert.service';
import { UserService } from './services/user/user.service';
import { User } from './models/user.model';
import { AuthService } from './services/auth/auth.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  isLoading: boolean = false;
  loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  isAlert: boolean = false;
  isError: boolean = false;
  user: User = new User();

  constructor(
    private userService: UserService,
    private authService: AuthService
  ) {}

  async ngOnInit() {
    this.loading$.subscribe((isLoadingKey) => {
      this.isLoading = isLoadingKey;
    });

    this.validateLoggedUser();
  }

  async validateLoggedUser() {
    this.show();
    const userIdLogged: any = localStorage.getItem('userId');
    if (userIdLogged) {
      const user = await this.userService.getUserChange(userIdLogged);
      this.userService.suscribeUser({ ...user });
      this.authService.suscribeLogged(true);
      await this.hide();
    } else {
      Promise.resolve(this.hide());
    }
  }

  show() {
    this.loading$.next(true);
  }

  hide() {
    this.loading$.next(false);
  }
}
