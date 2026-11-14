import {
  Component,
  inject,
  OnInit,
  signal,
  ViewChild,
  ElementRef,
  OnDestroy,
  computed,
} from '@angular/core';
import { CountriesService } from './countries.service';
import { CountryCard } from '../../shared/components/country-card/country-card';
import { Filters } from '../../shared/tools/filters/filters';
import { CountryCardService } from '../../shared/components/country-card/country-card.service';

@Component({
  selector: 'app-countries',
  imports: [CountryCard, Filters],
  templateUrl: './countries.html',
  styleUrl: './countries.scss',
})
export class Countries implements OnInit, OnDestroy {
  private countriesService = inject(CountriesService);
  private countryCardService = inject(CountryCardService);

  countries = this.countriesService.countries;
  status = this.countriesService.status;

  selectedRegion = signal<string | undefined>('All');

  ngOnInit() {
    this.countriesService.loadCountries();
    if (this.countryCardService.backgroundList().size === 0) {
      this.countryCardService.loadBackgroundsNeeded();
    }
  }

  regionFiltered(region?: string) {
    this.selectedRegion.set(region);
    this.visibleCount.set(this.pageSize);

    this.countriesService.loadCountries({
      region: region === 'All' ? undefined : region,
      mostPopular: false,
    });
  }

  private readonly pageSize = 12;

  visibleCount = signal(this.pageSize);

  visibleCountries = computed(() => this.countries().slice(0, this.visibleCount()));

  private scrollObserver?: IntersectionObserver;

  @ViewChild('scrollTrigger')
  set scrollTrigger(element: ElementRef<HTMLElement> | undefined) {
    if (!element) {
      this.scrollObserver?.disconnect();
      return;
    }

    this.scrollObserver = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          this.loadMoreCountries();
        }
      },
      {
        root: null,
        rootMargin: '600px',
        threshold: 0,
      },
    );

    this.scrollObserver.observe(element.nativeElement);
  }

  loadMoreCountries() {
    this.countriesService.allVisibleCountries.set(
      this.visibleCount() >= this.countriesService.countries().length,
    );
    if (this.countriesService.allVisibleCountries()) {
      return;
    }

    this.visibleCount.update((count) => Math.min(count + this.pageSize, this.countries().length));
  }

  ngOnDestroy() {
    this.countriesService.allVisibleCountries.set(false);
    this.scrollObserver?.disconnect();
  }
}
// filteredCountries = computed(() => {
//   const countries = this.countries();
//   const region = this.selectedRegion();

//   if (region === 'All') {
//     return countries;
//   }

//   return countries.filter((country) => country.region === region);
// });
