import { Component, computed, inject, input } from '@angular/core';
import { Country } from '../../../features/countries/countries.model';
import { CountryCardService } from './country-card.service';

type Origin = 'popular' | 'countries';

@Component({
  selector: 'app-country-card',
  imports: [],
  templateUrl: './country-card.html',
  styleUrl: './country-card.scss',
})
export class CountryCard {
  private countryCardService = inject(CountryCardService);

  origin = input.required<Origin>();
  country = input.required<Country>();

  status = this.countryCardService.backgroundsLoadingStatus;

  backgroundImage = computed(() => {
    const countryId = this.country().id;

    return this.countryCardService.backgroundList().get(countryId) ?? '';
  });

  countrySelected(countryId: number) {
    console.log(countryId);
  }
}
