import { TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AlertService } from './alert.service';

describe('AlertService', () => {
  let service: AlertService;
  let snackBarSpy: jasmine.SpyObj<MatSnackBar>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('MatSnackBar', ['open']);

    TestBed.configureTestingModule({
      providers: [
        AlertService,
        { provide: MatSnackBar, useValue: spy }
      ]
    });
    
    service = TestBed.inject(AlertService);
    snackBarSpy = TestBed.inject(MatSnackBar) as jasmine.SpyObj<MatSnackBar>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#setMessage should update the message$', () => {
    const message = 'Test message';
    service.setMessage(message);

    service.message$.subscribe(msg => {
      expect(msg).toEqual(message);
    });
  });

  it('#openSnackBar should call MatSnackBar open method', () => {
    const message = 'Snackbar message';
    service.openSnackBar(message);

    expect(snackBarSpy.open).toHaveBeenCalledWith(message, 'Cerrar', {
      duration: 5 * 1000
    });
  });
});
