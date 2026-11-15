import { Component, inject, OnDestroy } from '@angular/core';
import { AuthenticationService } from './authentication.service';

@Component({
  selector: 'app-authentication',
  imports: [],
  templateUrl: './authentication.html',
  styleUrl: './authentication.scss',
})
export class Authentication {
  private authenticationService = inject(AuthenticationService);

  authenticationType = this.authenticationService.authenticationType;
}
