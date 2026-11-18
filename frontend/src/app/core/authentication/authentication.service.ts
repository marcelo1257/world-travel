import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { of } from 'rxjs';

export interface RegisterResponseSuccess {
  code: string;
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private http = inject(HttpClient);
  private AuthenticationURL = 'http://localhost:3000/auth'; //Post to Register || Get to check

  _showAuthentication = signal<boolean>(false);
  showAuthentication = this._showAuthentication.asReadonly();

  _authenticationType = signal('');
  authenticationType = this._authenticationType.asReadonly();

  registerUser(form: FormGroup) {
    const params = {
      username: form.controls['username'].value,
      password: form.controls['password'].value,
      email: form.controls['email'].value,
    };

    const response = this.http.post<RegisterResponseSuccess>(
      this.AuthenticationURL + '/register',
      params,
    );
    return response;
  }

  checkFields(button: 'username' | 'email', form: FormGroup) {
    if (!form || !button) {
      return of(null);
    }

    const value = form.controls[button].value;

    if (!value) {
      return of(null);
    }

    let httpParams = new HttpParams().set(button, value);

    const response = this.http.get<RegisterResponseSuccess | null>(
      this.AuthenticationURL + '/checkavailability',
      {
        params: httpParams,
      },
    );
    return response;
  }
}
