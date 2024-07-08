import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { ActivatedRouteSnapshot } from '@angular/router';
import { CheckLoginGuard } from './check-login.guard';
import { UserService } from '../services/user/user.service';

describe('CheckLoginGuard', () => {
  let guard: CheckLoginGuard;
  let userServiceMock: any;
  let routerMock: any;

  beforeEach(() => {
    userServiceMock = {
      user: { rol: 'admin' }
    };

    routerMock = {
      navigate: jasmine.createSpy('navigate')
    };

    TestBed.configureTestingModule({
      providers: [
        CheckLoginGuard,
        { provide: UserService, useValue: userServiceMock },
        { provide: Router, useValue: routerMock }
      ]
    });

    guard = TestBed.inject(CheckLoginGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should allow activation if user role matches route role', () => {
    const routeMock = {
      data: { roles: ['admin', 'user'] }
    } as any;

    const result = guard.canActivate(routeMock);
    expect(result).toBeTrue();
    expect(routerMock.navigate).not.toHaveBeenCalled();
  });

  it('should deny activation if user role does not match route role', () => {
    userServiceMock.user.rol = 'guest';
    const routeMock = {
      data: { roles: ['admin', 'user'] }
    } as any;

    const result = guard.canActivate(routeMock);
    expect(result).toBeFalse();
    expect(routerMock.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should deny activation if route roles are not defined', () => {
    const routeMock = {
      data: {}
    } as ActivatedRouteSnapshot;

    const result = guard.canActivate(routeMock);
    expect(result).toBeFalse();
    expect(routerMock.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should return false if userService has no user', () => {
    userServiceMock.user = null;
    const routeMock = {
      data: { roles: ['admin'] }
    } as any;

    const result = guard.canActivate(routeMock);
    expect(result).toBeFalse();
    expect(routerMock.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should handle roles being null or empty array', () => {
    userServiceMock.user.rol = 'admin';

    const routeMockNull = {
      data: { roles: null }
    } as any;
    const routeMockEmpty = {
      data: { roles: [] }
    } as any;

    const resultNull = guard.canActivate(routeMockNull);
    const resultEmpty = guard.canActivate(routeMockEmpty);

    expect(resultNull).toBeFalse();
    expect(resultEmpty).toBeFalse();
    expect(routerMock.navigate).toHaveBeenCalledWith(['/login']);
  });
});
