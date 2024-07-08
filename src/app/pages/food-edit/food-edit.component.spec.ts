import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { FoodEditComponent } from './food-edit.component';
import Food from 'src/app/models/food.model';
import { FoodService } from 'src/app/services/food/food.service';
import { FoodsService } from 'src/app/services/food/foods.service';
import { LoadingService } from 'src/app/services/loading/loading.service';
import { of } from 'rxjs';

describe('FoodEditComponent', () => {
  let component: FoodEditComponent;
  let fixture: ComponentFixture<FoodEditComponent>;
  let activatedRoute: ActivatedRoute;
  let foodsService: FoodsService;
  let foodService: FoodService;
  let loadingService: LoadingService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FoodEditComponent],
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => '1' } } } },
        { provide: FoodsService, useValue: { getFood: () => of({ data: () => ({ id: '1', nombre: 'Pizza', precio: 10 }) }) } },
        { provide: FoodService, useValue: { suscribeFood: () => {} } },
        { provide: LoadingService, useValue: { show: () => {}, hide: () => {}, loading$: of(false) } }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodEditComponent);
    component = fixture.componentInstance;
    activatedRoute = TestBed.inject(ActivatedRoute);
    foodsService = TestBed.inject(FoodsService);
    foodService = TestBed.inject(FoodService);
    loadingService = TestBed.inject(LoadingService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize id and food correctly', () => {
    expect(component.id).toBe('1');
    expect(component.food).toEqual(jasmine.objectContaining({
      id: '1',
      nombre: 'Pizza',
      precio: 10
    }));
    expect(component.isLoading).toBe(false);
  });

  it('should load food data on init', () => {
    spyOn(loadingService, 'show');
    spyOn(loadingService, 'hide');
    spyOn(foodService, 'suscribeFood');

    component.ngOnInit();

    expect(loadingService.show).toHaveBeenCalled();
    expect(loadingService.hide).toHaveBeenCalled();
    expect(foodService.suscribeFood).toHaveBeenCalledWith(component.food);
  });
});
