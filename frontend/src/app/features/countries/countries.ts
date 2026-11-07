import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { CountriesService } from './countries.service';
import { CountryCard } from '../../shared/components/country-card/country-card';

@Component({
  selector: 'app-countries',
  imports: [CountryCard],
  templateUrl: './countries.html',
  styleUrl: './countries.scss',
})
export class Countries implements OnInit {
  private countriesService = inject(CountriesService);

  countries = this.countriesService.countriesReadOnly;
  status = this.countriesService.status;

  ngOnInit() {
    console.log('ngOnInit Countries');
    this.countriesService.loadCountries();
  }

  filters = [
    { id: 1, name: 'All', placeholder: 'All' },
    { id: 2, name: 'Asia', placeholder: 'Asia' },
    { id: 3, name: 'Africa', placeholder: 'Africa' },
    { id: 4, name: 'Europe', placeholder: 'Europe' },
    { id: 5, name: 'Americas', placeholder: 'America' },
    { id: 6, name: 'Oceania', placeholder: 'Oceânia' },
  ];

  selectedRegion = signal<string>('All');

  filteredCountries = computed(() => {
    const countries = this.countries();
    const region = this.selectedRegion();

    if (this.selectedRegion() === 'All') {
      return countries;
    }

    return countries.filter((country) => country.region === region);
  });
}
