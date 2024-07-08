import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreditcardFormComponent } from './creditcard-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { CartService } from 'src/app/services/cart/cart.service';
import { RegisterService } from 'src/app/services/register/register.service';
import { UserService } from 'src/app/services/user/user.service';
import { AlertService } from 'src/app/services/alert/alert.service';
import { LoadingService } from 'src/app/services/loading/loading.service';
import * as moment from 'moment';
import { User } from 'src/app/models/user.model';

describe('CreditcardFormComponent', () => {
  let component: CreditcardFormComponent;
  let fixture: ComponentFixture<CreditcardFormComponent>;
  let mockCartService: any;
  let mockRegisterService: any;
  let mockUserService;
  let mockAlertService: any;
  let mockLoadingService;
  let mockRouter: any;

  beforeEach(async () => {
    mockCartService = jasmine.createSpyObj(['cartList$']);
    mockRegisterService = jasmine.createSpyObj(['addRegister']);
    mockUserService = jasmine.createSpyObj(['user$']);
    mockAlertService = jasmine.createSpyObj(['openSnackBar']);
    mockLoadingService = jasmine.createSpyObj(['show']);
    mockRouter = jasmine.createSpyObj(['navigate']);

    await TestBed.configureTestingModule({
      declarations: [CreditcardFormComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: CartService, useValue: mockCartService },
        { provide: RegisterService, useValue: mockRegisterService },
        { provide: UserService, useValue: mockUserService },
        { provide: AlertService, useValue: mockAlertService },
        { provide: LoadingService, useValue: mockLoadingService },
        { provide: Router, useValue: mockRouter },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CreditcardFormComponent);
    component = fixture.componentInstance;

    mockCartService.cartList$.and.returnValue(of([]));
    mockUserService.user$.and.returnValue(of({ id: 1 }));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form on ngOnInit', () => {
    component.ngOnInit();

    expect(component.form).toBeDefined();
    expect(component.eras.length).toBe(15);
  });

  it('should call alertService and navigate when cart is empty', async () => {
    component.cartList = [];

    await component.submit();

    expect(mockAlertService.openSnackBar).toHaveBeenCalledWith('❌ Carrito vacío ❌');
    expect(mockRouter.navigate).toHaveBeenCalledWith(['shopping-cart']);
  });

  it('should add registers for each purchase in cartList', async () => {
    const purchase = { fecha: moment().format(), textListFood: 'Desayuno', idLista: '1' };
    component.cartList = [purchase];
    component.user = new User();

    await component.submit();

    expect(mockRegisterService.addRegister).toHaveBeenCalledWith({
      fecha: jasmine.any(String),
      idUsuario: 1,
      idDesayuno: '1',
      idAlmuerzo: '',
      idCena: '',
    });

    expect(mockAlertService.openSnackBar).toHaveBeenCalledWith('✅ Compra exitosa ✅');
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/registers']);
    expect(mockCartService.cleanCartList).toHaveBeenCalled();
  });
});
