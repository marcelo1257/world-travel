import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthenticationLogin } from './authentication-login';

describe('AuthenticationLogin', () => {
  let component: AuthenticationLogin;
  let fixture: ComponentFixture<AuthenticationLogin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthenticationLogin],
    }).compileComponents();

    fixture = TestBed.createComponent(AuthenticationLogin);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
