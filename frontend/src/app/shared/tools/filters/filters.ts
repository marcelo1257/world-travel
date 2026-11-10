import { Component, inject, input, output, signal } from '@angular/core';
import { CountriesService } from '../../../features/countries/countries.service';
import { filters } from './filters.model';

@Component({
  selector: 'app-filters',
  imports: [],
  templateUrl: './filters.html',
  styleUrl: './filters.scss',
})
export class Filters {
  private CountriesService = inject(CountriesService);
  countries = this.CountriesService.countriesReadOnly;

  filters = input(filters);

  selectedRegion = signal<string>('All');
  regionChange = output<string>();

  filterDetection(button: string) {
    this.selectedRegion.set(button);
    this.regionChange.emit(button);
  }
}
