import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import * as moment from 'moment';
import { CalendarComponent } from './calendar.component';
import { MenusService } from './../../services/menu/menus.service';
import { LoadingService } from './../../services/loading/loading.service';
import { DateService } from './../../services/date/date.service';

describe('CalendarComponent', () => {
  let component: CalendarComponent;
  let fixture: ComponentFixture<CalendarComponent>;
  let menusServiceStub: Partial<MenusService>;
  let routerStub: Partial<Router>;
  let loadingServiceStub: Partial<LoadingService>;
  let dateServiceStub: Partial<DateService>;

  beforeEach(async () => {
    menusServiceStub = {
      menus: [
        { id: 1, fecha: '2021-11-01', nombre: 'Menu 1' } as any,
        { id: 2, fecha: '2021-11-02', nombre: 'Menu 2' } as any,
      ],
    };

    routerStub = {
      navigate: jasmine.createSpy('navigate').and.returnValue(Promise.resolve(true)),
    };

    loadingServiceStub = {
      show: jasmine.createSpy('show'),
    };

    dateServiceStub = {
      susbribeDate: jasmine.createSpy('susbribeDate'),
    };

    await TestBed.configureTestingModule({
      declarations: [CalendarComponent],
      providers: [
        { provide: MenusService, useValue: menusServiceStub },
        { provide: Router, useValue: routerStub },
        { provide: LoadingService, useValue: loadingServiceStub },
        { provide: DateService, useValue: dateServiceStub },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize days of the week in Spanish', () => {
    expect(component.daysOfWeek.length).toBe(7);
    expect(component.daysOfWeek[0]).toBe('lunes');
  });

  it('should get days of the month correctly', () => {
    component.getDaysOfMonth(11, 2021);
    expect(component.daysOfMonth.length).toBe(30);
    expect(component.daysOfMonth[0].dateObject.format('YYYY-MM-DD')).toBe('2021-11-01');
    expect(component.daysOfMonth[0].menuStorage.nombre).toBe('Menu 1');
  });

  it('should change month correctly', () => {
    const initialDate = component.dateSelected.clone();
    component.changeMonth(1);
    expect(component.dateSelected.month()).toBe(initialDate.month() + 1);
    component.changeMonth(-1);
    expect(component.dateSelected.month()).toBe(initialDate.month());
  });

  it('should navigate to edit menu if menu exists', async () => {
    const date = { menuStorage: { id: 1 }, dateObject: moment('2021-11-01') };
    await component.showMenu(date);
    expect(routerStub.navigate).toHaveBeenCalledWith(['menu/edit/1']);
    expect(loadingServiceStub.show).toHaveBeenCalled();
  });

  it('should navigate to add menu if menu does not exist', async () => {
    const date = { menuStorage: null, dateObject: moment('2021-11-01') };
    await component.showMenu(date);
    expect(routerStub.navigate).toHaveBeenCalledWith(['menu/add']);
    expect(dateServiceStub.susbribeDate).toHaveBeenCalledWith(date.dateObject);
  });
});
