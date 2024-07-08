import { TestBed, ComponentFixture } from '@angular/core/testing';
import { FoodsComponent } from './foods.component';
import { LoadingService } from 'src/app/services/loading/loading.service';
import { FoodsService } from 'src/app/services/food/foods.service';
import { Observable, of } from 'rxjs';

describe('FoodsComponent', () => {
  let component: FoodsComponent;
  let fixture: ComponentFixture<FoodsComponent>;
  let loadingService: LoadingService;
  let foodsService: FoodsService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FoodsComponent],
      providers: [
        { provide: LoadingService, useValue: { loading$: of(false) } },
        { provide: FoodsService, useValue: { foods$: of([]) } }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodsComponent);
    component = fixture.componentInstance;
    loadingService = TestBed.inject(LoadingService);
    foodsService = TestBed.inject(FoodsService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize foods and isLoading correctly', () => {
    expect(component.foods).toBeTruthy();
    component.foods.subscribe((data) => {
      expect(data).toEqual([]);
    });
    expect(component.isLoading).toBe(false);
  });

  it('should update isLoading based on loadingService', () => {
    expect(component.isLoading).toBe(false);
    loadingService.loading$.next(true);
    expect(component.isLoading).toBe(true);
    loadingService.loading$.next(false);
    expect(component.isLoading).toBe(false);
  });
});
