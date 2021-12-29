interface Food{
	nombre: string;
	id: string;
}

export default class Lunch{
    id: string = '';
    foods: Array<Food> = []
}