import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthenticationRegister } from './authentication-register';

describe('AuthenticationRegister', () => {
  let component: AuthenticationRegister;
  let fixture: ComponentFixture<AuthenticationRegister>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthenticationRegister],
    }).compileComponents();

    fixture = TestBed.createComponent(AuthenticationRegister);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
