interface Food{
	nombre: string;
	id: string;
}

export default class Breakfast {
    id: string = '';
    foods: Array<Food> = []

  }