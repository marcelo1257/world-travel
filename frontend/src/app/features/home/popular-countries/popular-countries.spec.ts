import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopularCountries } from './popular-countries';

describe('PopularCountries', () => {
  let component: PopularCountries;
  let fixture: ComponentFixture<PopularCountries>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopularCountries],
    }).compileComponents();

    fixture = TestBed.createComponent(PopularCountries);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
