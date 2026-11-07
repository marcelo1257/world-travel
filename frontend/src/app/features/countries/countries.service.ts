import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { type Country } from './country.model';

type LoadingStatus = 'loading' | 'success' | 'error';

@Injectable({
  providedIn: 'root',
})
export class CountriesService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api/countries';

  private _status = signal<LoadingStatus>('loading');

  status = this._status.asReadonly();

  getCountries(): Observable<Country[]> {
    return this.http.get<Country[]>(this.apiUrl);
  }

  private _countries = signal<Country[]>([]);

  countriesReadOnly = this._countries.asReadonly();

  loadCountries(): void {
    this.getCountries().subscribe({
      next: (countries) => {
        this._countries.set(countries);
        this._status.set('success');
      },
      error: (error) => {
        console.log('Error loading countries: ', error);
        this._status.set('error');
      },
    });
  }
}
