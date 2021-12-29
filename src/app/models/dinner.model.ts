interface Food{
	nombre: string;
	id: string;
}

export default class Dinner{
    id: string = '';
    foods: Array<Food> = []
}