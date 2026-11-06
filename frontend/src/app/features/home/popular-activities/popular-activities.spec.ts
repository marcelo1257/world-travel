import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopularActivities } from './popular-activities';

describe('PopularActivities', () => {
  let component: PopularActivities;
  let fixture: ComponentFixture<PopularActivities>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopularActivities],
    }).compileComponents();

    fixture = TestBed.createComponent(PopularActivities);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
