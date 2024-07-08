import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MenuComponent } from './menu.component';
import { LoadingService } from 'src/app/services/loading/loading.service';
import { MenusService } from 'src/app/services/menu/menus.service';
import { of } from 'rxjs';
import Menu from 'src/app/models/menu.model';

describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;
  let loadingServiceSpy: jasmine.SpyObj<LoadingService>;
  let menusServiceSpy: jasmine.SpyObj<MenusService>;

  beforeEach(async () => {
    const loadingSpy = jasmine.createSpyObj('LoadingService', ['loading$']);
    const menusSpy = jasmine.createSpyObj('MenusService', ['getMenus']);

    await TestBed.configureTestingModule({
      declarations: [MenuComponent],
      providers: [
        { provide: LoadingService, useValue: loadingSpy },
        { provide: MenusService, useValue: menusSpy },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    loadingServiceSpy = TestBed.inject(LoadingService) as jasmine.SpyObj<LoadingService>;
    menusServiceSpy = TestBed.inject(MenusService) as jasmine.SpyObj<MenusService>;

    // Mock menusService.getMenus()
    const mockMenus: Menu[] = [
      { id: '1', fecha: '2024-07-08', idDesayunos: '1', idAlmuerzos: '2', idCenas: '3' },
      { id: '2', fecha: '2024-07-09', idDesayunos: '4', idAlmuerzos: '5', idCenas: '6' },
    ];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize isLoading as false', () => {
    expect(component.isLoading).toBeFalse();
  });

  it('should fetch menus from menusService', () => {
    expect(component.menus.length).toBe(2); // Verifica que se hayan cargado los menús correctamente
  });

  // Otros tests adicionales pueden incluir manejo de errores, actualización de la vista tras la carga, etc.
});
