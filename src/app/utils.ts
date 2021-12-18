import { FormBuilder, Validators } from '@angular/forms';

export default class Utils {
  defaultFileName: string = 'default.jpg';

  public getFoodFormFood() {
    const _builder: FormBuilder = new FormBuilder();
    return _builder.group({
      nombre: ['', Validators.compose([Validators.required])],
      precio: ['', Validators.compose([Validators.required])],
      descripcion: ['', Validators.compose([Validators.required])],
      file: ['', Validators.compose([])],
    });
  }

  public getFoodFormMenu() {
    const _builder: FormBuilder = new FormBuilder();
    return _builder.group({
      foodsDesayuno: [[], Validators.compose([Validators.required])],
      foodsAlmuerzo: [[], Validators.compose([Validators.required])],
      foodsCena: [[], Validators.compose([Validators.required])],
    });
  }

  public blobToFile = ({
    theBlob = new Blob(),
    fileName = this.defaultFileName,
  }): File => {
    let b: any = theBlob;
    b.lastModifiedDate = new Date();
    b.name = fileName;

    return <File>theBlob;
  };

  public getFileDefault() {
    return fetch('assets/default.jpg', {
      method: 'GET',
    }).then((response) => response.blob());
  }
}
