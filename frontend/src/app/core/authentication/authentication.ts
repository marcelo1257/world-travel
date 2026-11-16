import { Component, inject, OnDestroy } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { AuthenticationLogin } from './authentication-login/authentication-login';
import { AuthenticationRegister } from './authentication-register/authentication-register';

@Component({
  selector: 'app-authentication',
  imports: [AuthenticationLogin, AuthenticationRegister],
  templateUrl: './authentication.html',
  styleUrl: './authentication.scss',
})
export class Authentication {
  private authenticationService = inject(AuthenticationService);

  authenticationType = this.authenticationService.authenticationType;

  closeAuth() {
    this.authenticationService._showAuthentication.set(false);
  }
}
