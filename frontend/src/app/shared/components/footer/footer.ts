import { Component, inject } from '@angular/core';
import { CountriesService } from '../../../features/countries/countries.service';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {
  private countriesService = inject(CountriesService);

  allVisibleCountries = this.countriesService.allVisibleCountries;
}
