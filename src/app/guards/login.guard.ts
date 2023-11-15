import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';



export function loginGuard(): CanActivateFn {
 
  return () => {
    const router:Router=inject(Router)
    router.navigate([""])
    return true;

    
  //   const authService=inject(AuthService)
  //  // const oauthService: AuthService = inject(AuthService);
    
  //   if (authService.isAuthenticated()) {
  //     return true;
  //   }
  //   else{
  //   const router:Router=inject(Router)
  //   router.navigate([""])
  //   return false;
  //   }
    
  };
}



