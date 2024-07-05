import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { UserService } from './services/user/user.service';
import { AuthService } from './services/auth/auth.service';
import { of } from 'rxjs';
import { User } from './models/user.model';

describe('AppComponent', () => {
  let userServiceSpy: jasmine.SpyObj<UserService>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    const userSpy = jasmine.createSpyObj('UserService', ['getUserChange', 'suscribeUser']);
    const authSpy = jasmine.createSpyObj('AuthService', ['suscribeLogged']);

    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      providers: [
        { provide: UserService, useValue: userSpy },
        { provide: AuthService, useValue: authSpy },
      ],
    }).compileComponents();

    userServiceSpy = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have a default user`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.user).toEqual(jasmine.any(User));
  });

  it('should render loading spinner when isLoading is true', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.componentInstance.isLoading = true;
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.loading-spinner')).toBeTruthy();
  });

  it('should call validateLoggedUser on ngOnInit', async () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    spyOn(app, 'validateLoggedUser');
    await app.ngOnInit();
    expect(app.validateLoggedUser).toHaveBeenCalled();
  });

  it('should set isLoading to true when show is called', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.show();
    expect(app.isLoading).toBeTrue();
  });

  it('should set isLoading to false when hide is called', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.hide();
    expect(app.isLoading).toBeFalse();
  });

  it('should validate logged user on validateLoggedUser', async () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    const mockUser = new User();
    userServiceSpy.getUserChange.and.returnValue(Promise.resolve(mockUser));
    spyOn(localStorage, 'getItem').and.returnValue('123');

    await app.validateLoggedUser();
    expect(userServiceSpy.getUserChange).toHaveBeenCalledWith('123');
    expect(userServiceSpy.suscribeUser).toHaveBeenCalledWith(mockUser);
    expect(authServiceSpy.suscribeLogged).toHaveBeenCalledWith(true);
    expect(app.isLoading).toBeFalse();
  });

  it('should hide loading if no user is logged in', async () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    spyOn(localStorage, 'getItem').and.returnValue(null);

    await app.validateLoggedUser();
    expect(app.isLoading).toBeFalse();
  });
});
