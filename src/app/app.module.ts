import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from '../environments/environment';
import { routing } from './app.routing';
import { MaterialModule } from './material.module';

import { AppComponent } from './app.component';
import { MenuComponent } from './pages/menu/menu.component';
import { ButtonComponent } from './components/button/button.component';
import { InitialComponent } from './pages/initial/initial.component';
import { FoodsComponent } from './pages/foods/foods.component';
import { FormFoodComponent } from './components/form-food/form-food.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FoodListComponent } from './components/food-list/food-list.component';
import { FoodEditComponent } from './pages/food-edit/food-edit.component';
import { FoodAddComponent } from './pages/food-add/food-add.component';
import { FoodPreviewComponent } from './components/food-preview/food-preview.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { ErrorComponent } from './components/error/error.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { MenuEditComponent } from './pages/menu-edit/menu-edit.component';
import { TabComponent } from './components/tab/tab.component';
import { MenuAddComponent } from './pages/menu-add/menu-add.component';
import { MenuFormComponent } from './components/menu-form/menu-form.component';
import { CardPreviewComponent } from './components/card-preview/card-preview.component';
import { MenuWeekComponent } from './components/menu-week/menu-week.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { HomeComponent } from './pages/home/home.component';
import { RegisterComponent } from './pages/register/register.component';
import { HeroComponent } from './components/hero/hero.component';
import { ActivatedRouteSnapshot } from '@angular/router';
import { UserRegistersComponent } from './pages/user-registers/user-registers.component';
import { UserCartComponent } from './pages/user-cart/user-cart.component';
import { TableCartListComponent } from './components/table-cart-list/table-cart-list.component';
import { BuyComponent } from './pages/buy/buy.component';
import { CreditcardFormComponent } from './components/creditcard-form/creditcard-form.component';
import { InfoHeroComponent } from './components/info-hero/info-hero.component';

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
    FoodAddComponent,
    FoodPreviewComponent,
    SpinnerComponent,
    ErrorComponent,
    MenuComponent,
    CalendarComponent,
    MenuEditComponent,
    TabComponent,
    MenuAddComponent,
    MenuFormComponent,
    CardPreviewComponent,
    MenuWeekComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    RegisterComponent,
    HeroComponent,
    UserRegistersComponent,
    UserCartComponent,
    TableCartListComponent,
    BuyComponent,
    CreditcardFormComponent,
    InfoHeroComponent,
  ],
  imports: [
    BrowserModule,
    routing,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    BrowserAnimationsModule,
    MaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
