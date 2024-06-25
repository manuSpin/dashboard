import { authGuard } from './auth.guard';
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const AdminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.userRole === 'ADMIN_ROLE') {
    return true;
  } else {
    router.navigateByUrl('/dashboard');
    return false;
  }
};
