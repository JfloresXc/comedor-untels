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
import { LoginComponent } from './pages/login/login.component';

import { CheckLoginGuard } from './guards/check-login.guard';
import { HomeComponent } from './pages/home/home.component';
import { RegisterComponent } from './pages/register/register.component';
import { UserRegistersComponent } from './pages/user-registers/user-registers.component';
import { UserCartComponent } from './pages/user-cart/user-cart.component';
import { BuyComponent } from './pages/buy/buy.component';

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
    canActivate: [CheckLoginGuard],
    data: {
      roles: ['administrador'],
    },
  },
  {
    path: 'foods/add',
    component: FoodAddComponent,
    pathMatch: 'full',
    canActivate: [CheckLoginGuard],
    data: {
      roles: ['administrador'],
    },
  },
  {
    path: 'food/:id',
    component: FoodEditComponent,
    pathMatch: 'full',
    canActivate: [CheckLoginGuard],
  },
  {
    path: 'menu',
    component: MenuComponent,
    pathMatch: 'full',
    canActivate: [CheckLoginGuard],
    data: {
      roles: ['administrador'],
    },
  },
  {
    path: 'menu/add',
    pathMatch: 'full',
    component: MenuAddComponent,
    canActivate: [CheckLoginGuard],
    data: {
      roles: ['administrador'],
    },
  },
  {
    path: 'menu/edit/:id',
    component: MenuEditComponent,
    pathMatch: 'full',
    canActivate: [CheckLoginGuard],
    data: {
      roles: ['administrador'],
    },
  },
  { path: 'login', component: LoginComponent, pathMatch: 'full' },
  {
    path: 'register',
    component: RegisterComponent,
    pathMatch: 'full',
    canActivate: [CheckLoginGuard],
    data: {
      roles: ['administrador'],
    },
  },
  {
    path: 'home',
    component: HomeComponent,
    pathMatch: 'full',
    canActivate: [CheckLoginGuard],
    data: {
      roles: ['administrador', 'usuario'],
    },
  },
  {
    path: 'registers',
    component: UserRegistersComponent,
    pathMatch: 'full',
    canActivate: [CheckLoginGuard],
    data: {
      roles: ['usuario'],
    },
  },
  {
    path: 'shopping-cart',
    component: UserCartComponent,
    pathMatch: 'full',
    canActivate: [CheckLoginGuard],
    data: {
      roles: ['usuario'],
    },
  },
  {
    path: 'buy',
    component: BuyComponent,
    pathMatch: 'full',
    canActivate: [CheckLoginGuard],
    data: {
      roles: ['usuario'],
    },
  },
  { path: 'error', component: ErrorComponent, pathMatch: 'full' },
  { path: '**', pathMatch: 'full', redirectTo: 'login' },
];

export const routing = RouterModule.forRoot(appRoutes);
