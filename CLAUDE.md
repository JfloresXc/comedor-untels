# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Angular 12 application for managing a university cafeteria (Comedor UNTELS). The system handles food menu management, user registration for meals, and a shopping cart system for meal selection. It uses Firebase for backend services (Authentication and Firestore).

## Development Commands

```bash
# Start development server (runs on http://localhost:4200/)
npm start
# or
ng serve

# Build for production (outputs to dist/angular-comedor-untels/)
npm run build

# Build with watch mode for development
npm run watch

# Run unit tests with Karma
npm test
# or
ng test

# Generate new component/service/etc
ng generate component component-name
ng generate service service-name
```

## Architecture Overview

### Authentication & Authorization

- **Firebase Authentication**: Managed through [auth.service.ts](src/app/services/auth/auth.service.ts)
- **User Roles**: Two roles defined in the system:
  - `administrador`: Full access to food/menu management
  - `usuario`: Access to view menus, register for meals, and manage shopping cart
- **Route Guards**: [check-login.guard.ts](src/app/guards/check-login.guard.ts) protects routes based on user roles
- **User State**: Managed by [user.service.ts](src/app/services/user/user.service.ts) with userId stored in localStorage

### Data Models

Core entities located in [src/app/models/](src/app/models/):

- **Food**: Individual food items with name, price, description, image URL
- **Menu**: Daily menu linking breakfast (Desayuno), lunch (Almuerzo), and dinner (Cena) items
- **Register**: User meal registrations linking users to daily meals
- **User**: Basic user info with id, email, and rol (role)
- **Breakfast/Lunch/Dinner**: Separate models for each meal type containing food IDs

### Service Layer Architecture

Services use Firebase Firestore with a consistent pattern:
- BehaviorSubjects for reactive state management
- Collection names: `menus`, `foods`, `registers`, `users`
- Standard CRUD operations: add, get, update, delete

Key services in [src/app/services/](src/app/services/):
- **Menu Services**: [menu.service.ts](src/app/services/menu/menu.service.ts) (single), [menus.service.ts](src/app/services/menu/menus.service.ts) (collection)
- **Food Services**: [food.service.ts](src/app/services/food/food.service.ts) (single), [foods.service.ts](src/app/services/food/foods.service.ts) (collection)
- **Meal Services**: [breakfast.service.ts](src/app/services/breakfast/breakfast.service.ts), [lunch.service.ts](src/app/services/lunch/lunch.service.ts), [dinner.service.ts](src/app/services/dinner/dinner.service.ts)
- **Cart Service**: [cart.service.ts](src/app/services/cart/cart.service.ts) for shopping cart state management (in-memory only, not persisted)
- **Register Services**: [register.service.ts](src/app/services/register/register.service.ts), [registers.service.ts](src/app/services/register/registers.service.ts)

### Routing Structure

Routes defined in [app.routing.ts](src/app/app.routing.ts):

**Public Routes:**
- `/` - Landing page
- `/login` - User login
- `/forgotten` - Password recovery

**Admin Routes** (role: administrador):
- `/foods` - Food list management
- `/foods/add` - Add new food
- `/food/:id` - Edit food
- `/menu` - Menu list management
- `/menu/add` - Add new menu
- `/menu/edit/:id` - Edit menu
- `/register` - User registration (admin creates users)

**User Routes** (role: usuario):
- `/home` - View available menus
- `/registers` - View user's meal registrations
- `/shopping-cart` - Shopping cart for meal selection
- `/buy` - Checkout process

**Shared Routes** (both roles):
- `/home` - Dashboard/home page

### UI Components

**Reusable Components** in [src/app/components/](src/app/components/):
- **Navigation**: navbar, footer, hero, info-hero
- **Forms**: form-food, menu-form, creditcard-form
- **Display**: food-list, food-preview, card-preview, menu-week, table-cart-list
- **Utilities**: calendar, spinner, error, button, tab

**Page Components** in [src/app/pages/](src/app/pages/):
- Admin pages: foods, food-add, food-edit, menu, menu-add, menu-edit, register
- User pages: home, user-cart, user-registers, buy
- Auth pages: initial, login, signup, forgotten

### Styling

- **Angular Material**: Purple-green theme (configured in angular.json)
- **Bootstrap 5**: Primary styling framework
- **jQuery + Popper.js**: For Bootstrap components
- **Material Icons**: Icon font

### Firebase Configuration

Environment files in [src/environments/](src/environments/):
- `environment.ts` - Development config
- `environment.prod.ts` - Production config (file replacement in build)

Firebase project: `comidas-2021-11`
- Authentication enabled
- Firestore database
- Firebase Storage for food images (storageBucket: `comidas-2021-11.appspot.com`)

## Important Patterns

### State Management
Services use RxJS BehaviorSubjects for reactive state:
```typescript
item$: BehaviorSubject<Item> = new BehaviorSubject<Item>(new Item());
```

### Loading States
[loading.service.ts](src/app/services/loading/loading.service.ts) manages global loading spinner via BehaviorSubject.

### Error Handling
- [alert.service.ts](src/app/services/alert/alert.service.ts) displays snackbar notifications
- [error.service.ts](src/app/services/error/error.service.ts) for error management
- Auth errors handled in [auth.service.ts](src/app/services/auth/auth.service.ts) with Spanish error messages

### Firebase Data Access
Standard pattern for getting documents with real-time updates:
```typescript
this.firestore.collection('collection-name')
  .doc(id)
  .get()
  .subscribe((doc: any) => {
    this.item$.next({ ...doc.data(), id: doc.id });
  });
```

## Special Considerations

- **Angular Version**: 12.2.0 (older version, TypeScript ~4.3.5)
- **Strict Mode**: Enabled in angular.json
- **Bundle Size Limits**: Configured in angular.json (5MB max for initial and component styles)
- **Spanish Language**: All UI text, error messages, and comments are in Spanish
- **Date Handling**: Uses moment.js library for date operations
