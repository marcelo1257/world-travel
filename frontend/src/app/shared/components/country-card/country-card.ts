import { Component, input } from '@angular/core';
import { Country } from '../../../features/countries/countries.model';

@Component({
  selector: 'app-country-card',
  imports: [],
  templateUrl: './country-card.html',
  styleUrl: './country-card.scss',
})
export class CountryCard {
  country = input.required<Country>();
}
