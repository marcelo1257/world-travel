import { Component, inject, OnInit } from '@angular/core';
import { PopularCountries } from './popular-countries/popular-countries';
import { PopularRoutes } from './popular-routes/popular-routes';
import { PopularActivities } from './popular-activities/popular-activities';
import { CountryCardService } from '../../shared/components/country-card/country-card.service';

@Component({
  selector: 'app-home',
  imports: [PopularCountries, PopularRoutes, PopularActivities],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit {
  private countryCardService = inject(CountryCardService);

  ngOnInit() {
    if (this.countryCardService.backgroundList().size === 0) {
      this.countryCardService.loadBackgroundsNeeded();
    }
  }
}
