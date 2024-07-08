import { TestBed } from '@angular/core/testing';
import { FoodService } from './food.service';
import Food from 'src/app/models/food.model';
import { BehaviorSubject } from 'rxjs';

describe('FoodService', () => {
  let service: FoodService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FoodService],
    });
    service = TestBed.inject(FoodService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have initial food values', () => {
    const initialFood = service.food;
    expect(initialFood.id).toEqual('-1');
    expect(initialFood.nombre).toEqual('');
    expect(initialFood.precio).toEqual(0);
    expect(initialFood.descripcion).toEqual('');
    expect(initialFood.fecha).toEqual(new Date().toLocaleDateString());
    expect(initialFood.urlImagen).toEqual('');
    expect(initialFood.nombreImagen).toEqual('');
  });

  it('should get observable of food', () => {
    service.get$Food().subscribe((food: Food) => {
      expect(food).toEqual(service.food);
    });
  });

  it('should update food through BehaviorSubject', () => {
    const updatedFood: Food = {
      id: '1',
      nombre: 'Pizza',
      precio: 12.99,
      descripcion: 'Delicious pizza',
      fecha: new Date().toLocaleDateString(),
      urlImagen: 'pizza.jpg',
      nombreImagen: 'pizza_image',
    };

    service.suscribeFood(updatedFood);

    service.get$Food().subscribe((food: Food) => {
      expect(food).toEqual(updatedFood);
    });
  });
});
