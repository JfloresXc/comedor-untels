import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/user/user.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { of } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let userServiceSpy: jasmine.SpyObj<UserService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const authSpy = jasmine.createSpyObj('AuthService', ['login']);
    const userSpy = jasmine.createSpyObj('UserService', ['getUser']);
    const routerSpyObj = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      providers: [
        { provide: AuthService, useValue: authSpy },
        { provide: UserService, useValue: userSpy },
        { provide: Router, useValue: routerSpyObj },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    userServiceSpy = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to home if user is logged in', () => {
    userServiceSpy.user = { email: 'test@example.com' } as User;
    component.ngOnInit();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should set error messages for invalid form', () => {
    component.form.controls.email.setValue('invalid_email');
    component.form.controls.password.setValue('short');
    component.submit();
    expect(component.form.valid).toBeFalse();
  });

  it('should call AuthService login method with correct credentials', fakeAsync(() => {
    const email = 'test@example.com';
    const password = 'validPassword';
    component.form.controls.email.setValue(email);
    component.form.controls.password.setValue(password);
    component.submit();
    tick();
    expect(authServiceSpy.login).toHaveBeenCalledWith(email, password);
  }));

  it('should reset form after successful login', fakeAsync(() => {
    component.form.controls.email.setValue('test@example.com');
    component.form.controls.password.setValue('validPassword');
    component.submit();
    tick();
    expect(component.form.value).toEqual({ email: '', password: '' });
  }));

  it('should navigate to forgotten password page', () => {
    component.forgotPassword();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/forgotten']);
  });
});
