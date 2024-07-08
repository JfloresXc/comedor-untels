import Breakfast from './breakfast.model';

describe('Breakfast', () => {
  let breakfast: Breakfast;

  beforeEach(() => {
    breakfast = new Breakfast();
  });

  it('should create an instance of Breakfast', () => {
    expect(breakfast).toBeTruthy();
  });

  it('should have an empty id by default', () => {
    expect(breakfast.id).toBe('');
  });

  it('should have an empty foods array by default', () => {
    expect(breakfast.foods.length).toBe(0);
  });

  it('should be able to add a food item', () => {
    const foodItem: any = { nombre: 'Pancakes', id: '1' };
    breakfast.foods.push(foodItem);
    expect(breakfast.foods.length).toBe(1);
    expect(breakfast.foods[0]).toEqual(foodItem);
  });

  it('should be able to remove a food item by id', () => {
    const foodItem1: any = { nombre: 'Pancakes', id: '1' };
    const foodItem2: any = { nombre: 'Waffles', id: '2' };
    breakfast.foods.push(foodItem1);
    breakfast.foods.push(foodItem2);

    breakfast.foods = breakfast.foods.filter(food => food.id !== '1');
    
    expect(breakfast.foods.length).toBe(1);
    expect(breakfast.foods[0]).toEqual(foodItem2);
  });

  it('should be able to find a food item by id', () => {
    const foodItem1: any = { nombre: 'Pancakes', id: '1' };
    const foodItem2: any = { nombre: 'Waffles', id: '2' };
    breakfast.foods.push(foodItem1);
    breakfast.foods.push(foodItem2);

    const foundFood = breakfast.foods.find(food => food.id === '2');
    
    expect(foundFood).toEqual(foodItem2);
  });
});
