import { Component, OnInit } from '@angular/core';
import Menu from 'src/app/models/menu.model';
import { LoadingService } from 'src/app/services/loading/loading.service';
import { MenusService } from 'src/app/services/menu/menus.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  isLoading: boolean = false;
  menus: Menu[] = [];
  constructor(
    private loadingService: LoadingService,
    private menusService: MenusService
  ) {}

  ngOnInit(): void {
    this.loadingService.loading$.subscribe((isLoadingKey) => {
      this.isLoading = isLoadingKey;
    });

    this.menus = this.menusService.menus;
  }
}
