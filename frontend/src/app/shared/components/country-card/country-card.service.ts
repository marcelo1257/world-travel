import { HttpClient } from '@angular/common/http';
import { inject, Injectable, OnInit, signal } from '@angular/core';

interface BackgroundList {
  country_id: number;
  image_url: string;
}

type backgroundsLoadingStatus = 'loading' | 'sucess' | 'error';

@Injectable({
  providedIn: 'root',
})
export class CountryCardService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api/countrycard/backgrounds';

  _backgroundsLoadingStatus = signal<backgroundsLoadingStatus>('sucess');
  backgroundsLoadingStatus = this._backgroundsLoadingStatus.asReadonly();

  _backgroundList = signal<Map<number, string>>(new Map());
  backgroundList = this._backgroundList.asReadonly();

  getBackgroundList() {
    return this.http.get<BackgroundList[]>(this.apiUrl);
  }

  loadBackgroundsNeeded() {
    this.getBackgroundList().subscribe({
      next: (data) => {
        const images = new Map<number, string>();

        data.forEach((country) => images.set(country.country_id, country.image_url));

        this._backgroundList.set(images);
        console.log(images);
        this._backgroundsLoadingStatus.set('sucess');
      },
      error: (error) => {
        this._backgroundsLoadingStatus.set('error');
        console.log(error);
      },
    });
  }
}
