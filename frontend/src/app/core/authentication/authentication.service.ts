import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  _showAuthentication = signal<boolean>(false);
  showAuthentication = this._showAuthentication.asReadonly();

  _authenticationType = signal('');
  authenticationType = this._authenticationType.asReadonly();
}
