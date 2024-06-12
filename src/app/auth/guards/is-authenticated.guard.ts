import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AuthStatus } from '../interfaces/auth-status.enum';
;

export const isAuthenticatedGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  console.log('isAuthenticatedGuard:', authService.authStatus());

  if (authService.authStatus() === AuthStatus.authenticated) {
    return true;
  }

  router.navigateByUrl('/auth/login');
  return false;
};

export const isNotAuthenticatedGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  console.log('isNotAuthenticatedGuard:', authService.authStatus());

  if (authService.authStatus() === AuthStatus.authenticated) {
    router.navigateByUrl('/heroes');
    return false;
  }

  return true;
};
