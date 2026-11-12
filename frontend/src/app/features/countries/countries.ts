import { Component, inject, OnInit, signal } from '@angular/core';
import { CountriesService } from './countries.service';
import { CountryCard } from '../../shared/components/country-card/country-card';
import { Filters } from '../../shared/tools/filters/filters';
import { CountryCardService } from '../../shared/components/country-card/country-card.service';

@Component({
  selector: 'app-countries',
  imports: [CountryCard, Filters],
  templateUrl: './countries.html',
  styleUrl: './countries.scss',
})
export class Countries implements OnInit {
  private countriesService = inject(CountriesService);
  private countryCardService = inject(CountryCardService);

  countries = this.countriesService.countries;
  status = this.countriesService.status;

  selectedRegion = signal<string | undefined>('All');

  ngOnInit() {
    this.countriesService.loadCountries();
    if (this.countryCardService.backgroundList().size === 0) {
      this.countryCardService.loadBackgroundsNeeded();
    }
  }

  regionFiltered(region?: string) {
    this.selectedRegion.set(region);

    return this.countriesService.loadCountries({
      region: region === 'All' ? undefined : region,
      mostPopular: false,
    });
  }
}
// filteredCountries = computed(() => {
//   const countries = this.countries();
//   const region = this.selectedRegion();

//   if (region === 'All') {
//     return countries;
//   }

//   return countries.filter((country) => country.region === region);
// });
