import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { of, Subject } from 'rxjs';
import Food from 'src/app/models/food.model';
import { FoodsService } from 'src/app/services/food/foods.service';
import { LoadingService } from 'src/app/services/loading/loading.service';

import { FoodListComponent } from './food-list.component';

describe('FoodListComponent', () => {
  let component: FoodListComponent;
  let fixture: ComponentFixture<FoodListComponent>;
  let mockFoodsService: jasmine.SpyObj<FoodsService>;

  beforeEach(async () => {
    mockFoodsService = jasmine.createSpyObj('FoodsService', ['getListFoods']);
    await TestBed.configureTestingModule({
      declarations: [FoodListComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: FoodsService, useValue: mockFoodsService },
        LoadingService,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodListComponent);
    component = fixture.componentInstance;

    // Simular un Subject observable para foods$
    const foodsSubject = new Subject<Food[]>();

    // Datos de ejemplo para simular
    const mockFoodsData: Food[] = [
      {
        id: '1',
        nombre: 'Pizza',
        precio: 10,
        descripcion: 'Delicious pizza',
        fecha: new Date().toLocaleDateString(),
        urlImagen: '',
        nombreImagen: 'pizza.jpg',
      },
      {
        id: '2',
        nombre: 'Burger',
        precio: 8,
        descripcion: 'Tasty burger',
        fecha: new Date().toLocaleDateString(),
        urlImagen: '',
        nombreImagen: 'burger.jpg',
      },
    ];

    // Mock para el método getListFoods
    mockFoodsService.getListFoods.and.returnValue(of(mockFoodsData));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize foods and foodsPreview arrays from FoodsService', () => {
    expect(component.foods.length).toBe(2);
    expect(component.foodsPreview.length).toBe(2);
  });

  it('should update foods and foodsPreview arrays when foods$ emits new data', () => {
    const newData: Food[] = [
      {
        id: '3',
        nombre: 'Pasta',
        precio: 12,
        descripcion: 'Delicious pasta',
        fecha: new Date().toLocaleDateString(),
        urlImagen: '',
        nombreImagen: 'pasta.jpg',
      },
    ];

    mockFoodsService.foods$.next(newData);

    expect(component.foods.length).toBe(1);
    expect(component.foods[0].nombre).toBe('Pasta');
    expect(component.foodsPreview.length).toBe(1);
    expect(component.foodsPreview[0].nombre).toBe('Pasta');
  });

  it('should update foodsPreview array based on handleChangeFoods method', () => {
    component.foods = [
      {
        id: '1',
        nombre: 'Pizza',
        precio: 10,
        descripcion: 'Delicious pizza',
        fecha: new Date().toLocaleDateString(),
        urlImagen: '',
        nombreImagen: 'pizza.jpg',
      },
      {
        id: '2',
        nombre: 'Burger',
        precio: 8,
        descripcion: 'Tasty burger',
        fecha: new Date().toLocaleDateString(),
        urlImagen: '',
        nombreImagen: 'burger.jpg',
      },
    ];
    component.handleChangeFoods('pizza');
    expect(component.foodsPreview.length).toBe(1);
    expect(component.foodsPreview[0].nombre.toLowerCase()).toContain('pizza');
  });

  afterEach(() => {
    fixture.destroy();
  });
});
