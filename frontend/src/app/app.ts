import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './shared/components/header/header';
import { Footer } from './shared/components/footer/footer';
import { Authentication } from './core/authentication/authentication';
import { AuthenticationService } from './core/authentication/authentication.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer, Authentication],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('World Travel');

  backgroundNumber = Math.floor(Math.random() * 6) + 1;

  private authenticationService = inject(AuthenticationService);
  showAuthentication = this.authenticationService.showAuthentication;

  ngOnDestroy() {
    this.authenticationService._showAuthentication.set(false);
  }

  closeAuthentication() {
    this.authenticationService._showAuthentication.set(false);
  }
}
