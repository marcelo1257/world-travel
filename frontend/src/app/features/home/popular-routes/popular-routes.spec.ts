import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopularRoutes } from './popular-routes';

describe('PopularRoutes', () => {
  let component: PopularRoutes;
  let fixture: ComponentFixture<PopularRoutes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopularRoutes],
    }).compileComponents();

    fixture = TestBed.createComponent(PopularRoutes);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
