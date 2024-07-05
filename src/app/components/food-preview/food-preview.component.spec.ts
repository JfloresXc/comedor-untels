import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FoodPreviewComponent } from './food-preview.component';
import { FoodsService } from 'src/app/services/food/foods.service';
import { LoadingService } from 'src/app/services/loading/loading.service';
import Food from 'src/app/models/food.model';
import { storage } from 'src/app/firebase';
import { deleteObject, ref } from 'firebase/storage';
import { of } from 'rxjs';

describe('FoodPreviewComponent', () => {
  let component: FoodPreviewComponent;
  let fixture: ComponentFixture<FoodPreviewComponent>;
  let mockFoodsService: jasmine.SpyObj<FoodsService>;
  let mockRouter: Router;

  beforeEach(async () => {
    mockFoodsService = jasmine.createSpyObj('FoodsService', ['deleteFood']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [FoodPreviewComponent],
      imports: [MatDialogModule, RouterTestingModule],
      providers: [
        { provide: FoodsService, useValue: mockFoodsService },
        LoadingService,
        { provide: MAT_DIALOG_DATA, useValue: {} }
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodPreviewComponent);
    component = fixture.componentInstance;
    component.food = {
      id: '1',
      nombre: 'Pizza',
      precio: 10,
      descripcion: 'Delicious pizza',
      fecha: new Date().toLocaleDateString(),
      urlImagen: '',
      nombreImagen: 'pizza.jpg',
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should delete food and navigate on delete()', async () => {
    const foodToDelete: Food = {
      id: '1',
      nombre: 'Pizza',
      precio: 10,
      descripcion: 'Delicious pizza',
      fecha: new Date().toLocaleDateString(),
      urlImagen: '',
      nombreImagen: 'pizza.jpg',
    };

    // Mock para deleteObject de Firebase
    mockFoodsService.deleteFood.and.returnValue(Promise.resolve());

    // Llamar al método delete del componente
    await component.delete(foodToDelete);

    // Verificar que se llame correctamente a deleteFood del servicio
    expect(mockFoodsService.deleteFood).toHaveBeenCalledWith(foodToDelete.id);

    // Verificar que se haya navegado a la ruta correcta
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/food/1']);
  });

  it('should redirect to edit food on redirectEdit()', async () => {
    const foodId = '1';

    await component.redirectEdit(foodId);

    expect(mockRouter.navigate).toHaveBeenCalledWith(['/food/1']);
  });

  afterEach(() => {
    fixture.destroy();
  });
});
