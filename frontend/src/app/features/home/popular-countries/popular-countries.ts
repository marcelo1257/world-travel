import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Filters } from '../../../shared/tools/filters/filters';
import { CountriesService } from '../../countries/countries.service';
import { CountryCard } from '../../../shared/components/country-card/country-card';
import { filter } from 'rxjs';

@Component({
  selector: 'app-popular-countries',
  imports: [RouterLink, Filters, CountryCard],
  templateUrl: './popular-countries.html',
  styleUrl: './popular-countries.scss',
})
export class PopularCountries implements OnInit {
  countriesService = inject(CountriesService);

  countries = this.countriesService.countriesReadOnly;

  selectedRegion = signal<string | undefined>('All');
  status = this.countriesService.status;

  defaultFilters = {
    limit: 10,
    mostPopular: true,
  };

  ngOnInit() {
    this.countriesService.loadCountries(this.defaultFilters);
  }

  regionFiltered(region?: string) {
    this.selectedRegion.set(region);

    const filters = {
      ...this.defaultFilters,
      region: region === 'All' ? undefined : region,
    };

    this.countriesService.loadCountries(filters);
  }
}
