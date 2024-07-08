import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TabComponent } from './tab.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { FoodsService } from 'src/app/services/food/foods.service';
import { FoodService } from 'src/app/services/food/food.service';
import { AlertService } from 'src/app/services/alert/alert.service';
import { of } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('TabComponent', () => {
  let component: TabComponent;
  let fixture: ComponentFixture<TabComponent>;
  let foodsServiceMock: any;
  let foodServiceMock: any;
  let alertServiceMock: any;
  let matDialogMock: any;

  beforeEach(async () => {
    foodsServiceMock = {
      foods$: of([]),
      foods: [],
      getFood: jasmine.createSpy('getFood').and.returnValue(of({ data: () => ({ id: '1', nombre: 'Test Food' }) }))
    };

    foodServiceMock = {
      suscribeFood: jasmine.createSpy('suscribeFood')
    };

    alertServiceMock = {
      openSnackBar: jasmine.createSpy('openSnackBar')
    };

    matDialogMock = {
      open: jasmine.createSpy('open').and.returnValue({ afterClosed: () => of({}) })
    };

    await TestBed.configureTestingModule({
      declarations: [TabComponent],
      imports: [ReactiveFormsModule, MatDialogModule, BrowserAnimationsModule],
      providers: [
        { provide: FoodsService, useValue: foodsServiceMock },
        { provide: FoodService, useValue: foodServiceMock },
        { provide: AlertService, useValue: alertServiceMock },
        { provide: MatDialog, useValue: matDialogMock }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize foods and foodsPreview on ngOnInit', () => {
    component.ngOnInit();
    expect(component.foods).toEqual([]);
    expect(component.foodsPreview).toEqual([]);
  });

  it('should filter foods based on search input', () => {
    component.foods = [{ id: '1', nombre: 'Test Food' }, { id: '2', nombre: 'Another Food' }];
    component.handleChangeFoods('test');
    expect(component.foodsPreview).toEqual([{ id: '1', nombre: 'Test Food' }]);
  });

  it('should add food to list on addToList', () => {
    component.control.setValue([{ id: '1', nombre: 'Test Food' }]);
    component.addToList();
    expect(component.foodLista).toContain({ id: '1', nombre: 'Test Food' });
  });

  it('should clear control value after adding to list', () => {
    component.control.setValue([{ id: '1', nombre: 'Test Food' }]);
    component.addToList();
    expect(component.control.value).toEqual([]);
  });

  it('should call alert service on deleteFood', () => {
    component.foodLista = [{ id: '1', nombre: 'Test Food' }];
    component.deleteFood(0);
    expect(alertServiceMock.openSnackBar).toHaveBeenCalledWith('✅ Eliminado correctamente ✅');
  });

  it('should open dialog on openDialog', () => {
    const food = { id: '1', nombre: 'Test Food' };
    component.openDialog(food);
    expect(matDialogMock.open).toHaveBeenCalled();
    expect(foodsServiceMock.getFood).toHaveBeenCalledWith(food.id);
  });

  it('should call suscribeFood on showFood', () => {
    const food = { id: '1', nombre: 'Test Food' };
    component.showFood(food);
    expect(foodServiceMock.suscribeFood).toHaveBeenCalledWith({ id: '1', nombre: 'Test Food' });
  });
});
