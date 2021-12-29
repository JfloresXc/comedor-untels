import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableCartListComponent } from './table-cart-list.component';

describe('TableCartListComponent', () => {
  let component: TableCartListComponent;
  let fixture: ComponentFixture<TableCartListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableCartListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableCartListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
