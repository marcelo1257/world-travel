import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-popular-countries',
  imports: [RouterLink],
  templateUrl: './popular-countries.html',
  styleUrl: './popular-countries.scss',
})
export class PopularCountries {}
