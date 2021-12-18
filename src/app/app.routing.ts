import { SpinnerComponent } from './components/spinner/spinner.component';
import { MenuAddComponent } from './pages/menu-add/menu-add.component';
import { ErrorComponent } from './components/error/error.component';
import { RouterModule, Routes } from '@angular/router';
import { InitialComponent } from './pages/initial/initial.component';
import { FoodsComponent } from './pages/foods/foods.component';
import { FoodEditComponent } from './pages/food-edit/food-edit.component';
import { FoodAddComponent } from './pages/food-add/food-add.component';
import { MenuComponent } from './pages/menu/menu.component';
import { MenuEditComponent } from './pages/menu-edit/menu-edit.component';

const appRoutes: Routes = [
  {
    path: '',
    component: InitialComponent,
    pathMatch: 'full',
  },
  {
    path: 'foods',
    component: FoodsComponent,
    pathMatch: 'full',
  },
  { path: 'foods/add', component: FoodAddComponent, pathMatch: 'full' },
  { path: 'food/:id', component: FoodEditComponent, pathMatch: 'full' },
  { path: 'menu', component: MenuComponent, pathMatch: 'full' },
  { path: 'menu/add', component: MenuAddComponent, pathMatch: 'full' },
  { path: 'menu/edit/:id', component: MenuEditComponent, pathMatch: 'full' },
  { path: 'error', component: ErrorComponent, pathMatch: 'full' },
  { path: '**', pathMatch: 'full', redirectTo: '' },
];

export const routing = RouterModule.forRoot(appRoutes);
