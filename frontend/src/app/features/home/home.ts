import { Component } from '@angular/core';
import { PopularCountries } from './popular-countries/popular-countries';
import { PopularRoutes } from './popular-routes/popular-routes';
import { PopularActivities } from './popular-activities/popular-activities';

@Component({
  selector: 'app-home',
  imports: [PopularCountries, PopularRoutes, PopularActivities],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {}
