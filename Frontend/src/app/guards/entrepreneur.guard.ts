import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
export const entrepreneurGuard: CanActivateFn = (route, state) => {
  const router = inject(Router); // Proper way to inject dependencies in functional guards

  const token = localStorage.getItem('token'); // Example: check for a token
  const u = localStorage.getItem("user"); 
  
  
  if (token) {
    try {
      // Decode and validate token
      const decodedToken: any = jwtDecode(token);

      // Check if the token is expired
      const isExpired = decodedToken.exp * 1000 < Date.now();
      if (!isExpired) {
        if(u){
          const user = JSON.parse(u);
          if(user.role=="ENTREPRENEUR"){
            router.navigate(['/entrepreneur/dashboard']);
            console.log('Redirected');
            return false;
          }
        }
       
      }
    } catch (error) {
      console.error('Invalid token:', error);
    }
  }

  console.log('Not redirected');
  return true;
};
