import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CountryCard } from '../../../shared/components/country-card/country-card';

@Component({
  selector: 'app-popular-countries',
  imports: [RouterLink, CountryCard],
  templateUrl: './popular-countries.html',
  styleUrl: './popular-countries.scss',
})
export class PopularCountries {}
