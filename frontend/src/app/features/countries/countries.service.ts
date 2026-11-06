import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { type Country } from './country.model';

@Injectable({
  providedIn: 'root',
})
export class CountriesService {
  private http = inject(HttpClient);

  private apiUrl = 'http://localhost:3000/api/countries';

  getCountries(): Observable<Country[]> {
    return this.http.get<Country[]>(this.apiUrl);
  }

  private _countries = signal<Country[]>([]);

  countries = this._countries.asReadonly();

  loadCountries(): void {
    this.getCountries().subscribe({
      next: (countries) => {
        this._countries.set(countries);
      },
      error: (error) => console.log('Error loading countries: ', error),
    });
  }
}
