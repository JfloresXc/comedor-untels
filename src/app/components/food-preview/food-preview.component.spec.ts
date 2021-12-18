import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodPreviewComponent } from './food-preview.component';

describe('FoodPreviewComponent', () => {
  let component: FoodPreviewComponent;
  let fixture: ComponentFixture<FoodPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FoodPreviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
