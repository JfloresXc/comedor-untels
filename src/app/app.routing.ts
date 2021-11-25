import { RouterModule, Routes } from '@angular/router';
import { InitialComponent } from './pages/initial/initial.component';
import { FoodsComponent } from './pages/foods/foods.component';
import { FoodEditComponent } from './pages/food-edit/food-edit.component';

const appRoutes: Routes = [
  { path: '', component: InitialComponent, pathMatch: 'full' },
  { path: 'foods', component: FoodsComponent, pathMatch: 'full' },
  { path: 'food/:id', component: FoodEditComponent, pathMatch: 'full' },
  { path: '**', pathMatch: 'full', redirectTo: '' },
];

export const routing = RouterModule.forRoot(appRoutes);
