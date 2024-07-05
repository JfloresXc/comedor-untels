import { FormBuilder } from '@angular/forms';
import Utils from './utils';

describe('Utils', () => {
  let utils: Utils;

  beforeEach(() => {
    utils = new Utils();
  });

  it('should create an instance of Utils', () => {
    expect(utils).toBeTruthy();
  });

  it('should create a food form for food', () => {
    const form = utils.getFoodFormFood();
    expect(form.contains('nombre')).toBeTrue();
    expect(form.contains('precio')).toBeTrue();
    expect(form.contains('descripcion')).toBeTrue();
    expect(form.contains('file')).toBeTrue();
  });

  it('should create a food form for menu', () => {
    const form = utils.getFoodFormMenu();
    expect(form.contains('foodsDesayuno')).toBeTrue();
    expect(form.contains('foodsAlmuerzo')).toBeTrue();
    expect(form.contains('foodsCena')).toBeTrue();
  });

  it('should convert a Blob to a File', () => {
    const blob = new Blob(['content'], { type: 'text/plain' });
    const file = utils.blobToFile({ theBlob: blob, fileName: 'test.txt' });

    expect(file).toBeInstanceOf(File);
    expect(file.name).toBe('test.txt');
    expect(file.type).toBe('text/plain');
  });

  it('should fetch the default file', async () => {
    const blob = await utils.getFileDefault();
    expect(blob).toBeInstanceOf(Blob);
  });
});
