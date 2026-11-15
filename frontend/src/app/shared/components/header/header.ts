import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthenticationService } from '../../../core/authentication/authentication.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  private authenticationService = inject(AuthenticationService);

  showAuthenticationPanel(type: 'login' | 'register') {
    this.authenticationService._showAuthentication.set(true);
    this.authenticationService._authenticationType.set(type);
  }
}
