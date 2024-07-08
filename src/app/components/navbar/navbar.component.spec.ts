import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavbarComponent } from './navbar.component';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/user/user.service';
import { of } from 'rxjs';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let authServiceMock: any;
  let userServiceMock: any;

  beforeEach(async () => {
    authServiceMock = {
      isLogged$: of(true),
      logout: jasmine.createSpy('logout')
    };

    userServiceMock = {
      user: { rol: 'admin' }
    };

    await TestBed.configureTestingModule({
      declarations: [NavbarComponent],
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: UserService, useValue: userServiceMock }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set isLogged to true on init', () => {
    component.ngOnInit();
    expect(component.isLogged).toBeTrue();
  });

  it('should set isLogged to false on init when not logged', () => {
    authServiceMock.isLogged$ = of(false);
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component.isLogged).toBeFalse();
  });

  it('should validate navigation for admin role', () => {
    const roles = ['admin', 'user'];
    const result = component.validateNav(roles);
    expect(result).toBeTrue();
  });

  it('should not validate navigation for non-matching role', () => {
    userServiceMock.user.rol = 'guest';
    const roles = ['admin', 'user'];
    const result = component.validateNav(roles);
    expect(result).toBeFalse();
  });

  it('should return false for empty roles', () => {
    const result = component.validateNav([]);
    expect(result).toBeFalse();
  });


  it('should call logout on auth service', () => {
    component.logout();
    expect(authServiceMock.logout).toHaveBeenCalled();
  });

  it('should have default value for isLogged as false', () => {
    expect(component.isLogged).toBeFalse();
  });

  it('should have default value for showFiller as false', () => {
    expect(component.showFiller).toBeFalse();
  });

  it('should not break if userService has no user', () => {
    userServiceMock.user = null;
    expect(() => component.validateNav(['admin'])).not.toThrow();
  });

  it('should validate navigation correctly for multiple roles', () => {
    userServiceMock.user.rol = 'user';
    const roles = ['admin', 'user', 'editor'];
    const result = component.validateNav(roles);
    expect(result).toBeTrue();
  });
});
