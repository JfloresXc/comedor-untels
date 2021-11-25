import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from '../environments/environment';
import { routing } from './app.routing';

import { AppComponent } from './app.component';
import { ButtonComponent } from './components/button/button.component';
import { InitialComponent } from './pages/initial/initial.component';
import { FoodsComponent } from './pages/foods/foods.component';
import { FormFoodComponent } from './components/form-food/form-food.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FoodListComponent } from './components/food-list/food-list.component';
import { FoodEditComponent } from './pages/food-edit/food-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    ButtonComponent,
    InitialComponent,
    FoodsComponent,
    FormFoodComponent,
    NavbarComponent,
    FoodListComponent,
    FoodEditComponent,
  ],
  imports: [
    BrowserModule,
    routing,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
