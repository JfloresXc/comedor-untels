export default class Food {
  id: string = '-1';
  nombre: string = '';
  precio: number = 0;
  descripcion: string = '';
  fecha: string = new Date().toLocaleDateString();
  urlImagen: any = '';
  nombreImagen: string = '';

  // constructor() {
  //   this.nombre = '';
  //   this.precio = 0;
  //   this.descripcion = '';
  //   this.fecha = '';
  //   this.urlImagen = '';
  // }
  // constructor() {}
}
