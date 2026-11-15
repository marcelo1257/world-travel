import { Component, inject, signal } from '@angular/core';
import { Event, RouterLink, RouterLinkActive } from '@angular/router';
import { Authentication } from '../../../core/authentication/authentication';
import { NgComponentOutlet } from '@angular/common';
import { AuthenticationService } from '../../../core/authentication/authentication.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  private authenticationService = inject(AuthenticationService);

  showAuthenticationPanel(type: 'login' | 'register', event: MouseEvent) {
    this.authenticationService._showAuthentication.set(true);
    this.authenticationService._authenticationType.set(type);
    event.stopPropagation();
  }
}
