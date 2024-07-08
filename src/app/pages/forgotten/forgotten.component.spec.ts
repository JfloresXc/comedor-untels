import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { ForgottenComponent } from './forgotten.component';
import { AlertService } from 'src/app/services/alert/alert.service';

describe('ForgottenComponent', () => {
  let component: ForgottenComponent;
  let fixture: ComponentFixture<ForgottenComponent>;
  let alertServiceSpy: jasmine.SpyObj<AlertService>;

  beforeEach(async () => {
    const alertSpy = jasmine.createSpyObj('AlertService', ['openSnackBar']);

    await TestBed.configureTestingModule({
      declarations: [ForgottenComponent],
      providers: [
        { provide: AlertService, useValue: alertSpy }
      ]
    }).compileComponents();
  });

});
