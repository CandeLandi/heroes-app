import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AuthStatus } from '../interfaces/auth-status.enum';


//Estos guards se deberían llamar PublicGuard y PrivateGuard debido a que si negamos algo es positivo

export const isNotAuthenticatedGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.authStatus() === AuthStatus.authenticated) {
    router.navigateByUrl('/heroes');
    return false;
  }


  return true;
};
