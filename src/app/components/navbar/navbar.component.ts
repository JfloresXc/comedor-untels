import { Component, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/user/user.service';

const LINKS_ADMIN = ['users'];

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isLogged = false;
  showFiller = false;

  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.authService.isLogged$.subscribe((isLoggedKey) => {
      this.isLogged = isLoggedKey;
    });
  }

  validateNav(roles: any[]): boolean {
    let actived = false;
    const { rol } = this.userService.user;

    if (roles) {
      roles.forEach((role: any) => {
        if (role === rol) actived = true;
      });
    }

    return actived;
  }

  logout() {
    this.authService.logout();
  }
}
