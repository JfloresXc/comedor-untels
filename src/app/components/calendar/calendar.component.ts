import { DateService } from './../../services/date/date.service';
import { LoadingService } from './../../services/loading/loading.service';
import { Router } from '@angular/router';
import Menu from 'src/app/models/menu.model';
import { MenusService } from './../../services/menu/menus.service';
import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Moment } from 'moment';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
})
export class CalendarComponent implements OnInit {
  menus: Menu[] = [];
  month: string = '';
  year: string = '';
  daysOfMonth: any[] = [];
  daysOfWeek: any[] = [];
  dateSelected: Moment = moment();

  constructor(
    private menusService: MenusService,
    private router: Router,
    private loadingService: LoadingService,
    private dateService: DateService
  ) {}

  ngOnInit(): void {
    moment.locale('es');

    this.daysOfWeek = [...Array(7).keys()].map((key) => {
      const keyAdd = key + 1;
      return moment(`2021-11-${keyAdd}`).format('dddd');
    });

    const monthNow = moment().month() + 1;
    const yearNow = moment().year();

    this.menus = this.menusService.menus;
    this.getDaysOfMonth(monthNow, yearNow);
  }

  getDaysOfMonth(month: number, year: number) {
    this.month = moment(`${year}-${month}`).format('MMMM');
    this.year = moment(`${year}-${month}`).format('YYYY');

    const startDate = moment.utc(`${year}-${month}-01`);
    const endDate = startDate.clone().endOf('month');
    this.dateSelected = startDate;

    const daysAmount = Math.round(endDate.diff(startDate, 'days', true));

    const days = [...Array(daysAmount).keys()].map((key) => {
      let menuStorage;
      const newKey = key + 1;
      const dateObject = moment(`${year}-${month}-${newKey}`, 'YYYY-MM-DD');

      this.menus.forEach((menuKey: Menu) => {
        const { fecha } = menuKey;

        const dateStorage = moment(fecha).format('YYYY-MM-DD');
        if (dateObject.isSame(dateStorage)) {
          menuStorage = menuKey;
        }
      });

      return {
        dateObject,
        menuStorage,
        numberDay: newKey,
        indexWeek: dateObject.isoWeekday(),
      };
    });

    this.daysOfMonth = days;
  }

  changeMonth(flag: number) {
    if (flag < 0) {
      const prevDate = this.dateSelected.clone().subtract(1, 'month');
      this.getDaysOfMonth(prevDate.get('month') + 1, prevDate.get('year'));
    } else {
      const nextDate = this.dateSelected.clone().add(1, 'month');
      this.getDaysOfMonth(nextDate.get('month') + 1, nextDate.get('year'));
    }
  }

  async showMenu(date: any) {
    const { menuStorage, dateObject } = date;
    if (menuStorage) {
      const { id } = menuStorage;
      this.router.navigate([`menu/edit/${id}`]).then(() => {
        this.loadingService.show();
      });
    } else {
      this.router.navigate([`menu/add`]).then(() => {
        this.dateService.susbribeDate(dateObject);
      });
    }
  }
}
