import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';
import { UserService } from '../services/user/user.service';

@Injectable({
  providedIn: 'root',
})
export class CheckLoginGuard implements CanActivate {
  constructor(private userService: UserService, private route: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.checkUserLogin(route);
  }

  checkUserLogin(route: ActivatedRouteSnapshot): boolean {
    let actived = false;
    const { rol } = this.userService.user;
    const { roles } = route.data;

    if (roles) {
      roles.forEach((role: any) => {
        if (role === rol) actived = true;
      });
    }

    if (!actived) this.route.navigate(['/login']);
    return actived;
  }
}
