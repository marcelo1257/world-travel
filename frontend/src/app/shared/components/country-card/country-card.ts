import {
  Component,
  computed,
  ElementRef,
  inject,
  input,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { Country } from '../../../features/countries/countries.model';
import { CountryCardService } from './country-card.service';

type Origin = 'popular' | 'countries';

@Component({
  selector: 'app-country-card',
  imports: [],
  templateUrl: './country-card.html',
  styleUrl: './country-card.scss',
})
export class CountryCard implements OnDestroy {
  private countryCardService = inject(CountryCardService);

  origin = input.required<Origin>();
  country = input.required<Country>();

  status = this.countryCardService.backgroundsLoadingStatus;

  backgroundImage = computed(() => {
    const countryId = this.country().id;

    return this.countryCardService.backgroundList().get(countryId) ?? '';
  });

  private observed?: IntersectionObserver;

  @ViewChild('countryImage')
  set countryImage(element: ElementRef<HTMLImageElement> | undefined) {
    if (!element) {
      this.observed?.disconnect();
      return;
    }

    this.observed = new IntersectionObserver((entries) => {
      entries.forEach(
        (entry) => {
          if (entry.isIntersecting) {
            const image = entry.target as HTMLImageElement;
            image.src = image.dataset['src'] ?? '';

            this.observed?.unobserve(image);
          }
        },
        {
          root: null,
          rootMargin: '600px',
          threshold: 0,
        },
      );
    });
    this.observed.observe(element.nativeElement);
  }

  ngOnDestroy() {
    this.observed?.disconnect();
  }

  countrySelected(countryId: number) {
    console.log(countryId);
  }
}
