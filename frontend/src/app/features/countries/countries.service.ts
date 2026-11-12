import { inject, Injectable, signal } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, Subject, of } from 'rxjs';
import { switchMap, tap, catchError } from 'rxjs/operators';
import { Country } from './countries.model';

type LoadingStatus = 'loading' | 'success' | 'error';

interface CountriesQueryParams {
  region?: string;
  limit?: number;
  mostPopular: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class CountriesService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api/countries';

  private _countries = signal<Country[]>([]);
  countries = this._countries.asReadonly();

  private _status = signal<LoadingStatus>('loading');
  status = this._status.asReadonly();

  private paramsSubject = new Subject<CountriesQueryParams | undefined>();

  private countriesSubscription = this.paramsSubject
    .pipe(
      tap(() => this._status.set('loading')),

      switchMap((params) =>
        this.getCountries(params).pipe(
          tap((data) => {
            this._countries.set(data);
            this._status.set('success');
          }),
          catchError((error) => {
            console.error('Error loading countries:', error);
            this._status.set('error');
            return of([]);
          }),
        ),
      ),
    )
    .subscribe();

  getCountries(params?: CountriesQueryParams): Observable<Country[]> {
    let httpParams = new HttpParams();

    if (params?.region) {
      httpParams = httpParams.set('region', params.region);
    }
    if (params?.limit) {
      httpParams = httpParams.set('limit', params.limit);
    }
    if (params?.mostPopular === true) {
      httpParams = httpParams.set('mostPopular', params.mostPopular);
    }

    return this.http.get<Country[]>(this.apiUrl, { params: httpParams });
  }

  loadCountries(params?: CountriesQueryParams): void {
    this.paramsSubject.next(params);
  }
}
