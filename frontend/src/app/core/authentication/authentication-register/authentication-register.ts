import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';

type CheckButton = 'username' | 'email';

@Component({
  selector: 'app-authentication-register',
  imports: [ReactiveFormsModule],
  templateUrl: './authentication-register.html',
  styleUrl: './authentication-register.scss',
})
export class AuthenticationRegister {
  private authenticationService = inject(AuthenticationService);

  registerForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(6)]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(/^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/),
      Validators.minLength(6),
    ]),
    confirmPassword: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  onSubmit() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();

      Object.entries(this.registerForm.controls).forEach(([controlName, control]) => {
        console.log(controlName, control.errors, control.value);
      });

      return;
    }
    this.authenticationService.registerUser(this.registerForm).subscribe({
      next: (response) => {
        const username = this.registerForm.controls.username.value;
        this.registerForm.reset();
        this.authenticationService._showAuthentication.set(false);
        setTimeout(() => {
          alert('Wellcome ' + username);
        }, 2000);
      },
      error: (error) => {
        console.error('ERRO: ', error.error.code);
      },
    });
  }

  usernameValid = signal<boolean | null>(null);
  emailValid = signal<boolean | null>(null);

  checkFields(button: CheckButton) {
    this.authenticationService.checkFields(button, this.registerForm).subscribe({
      next: (response) => {
        if (response === null) {
          return;
        }
        if (response.code === button.toString().toUpperCase() + '_AVAILABLE') {
          if (button === 'username') {
            this.usernameValid.set(true);
          }
          if (button === 'email') {
            this.emailValid.set(true);
          }
          return;
        }
      },
      error: (error) => {
        if (button === 'username') {
          this.usernameValid.set(false);
        }
        if (button === 'email') {
          this.emailValid.set(false);
        }
        console.log('ERROR: ', error.error.code);
      },
    });
  }

  alertRequired() {
    return alert('Required Field');
  }
}
