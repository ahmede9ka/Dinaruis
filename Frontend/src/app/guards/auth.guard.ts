import { inject } from '@angular/core';
import { CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const router = inject(Router);

  // Extract role from route parameters
  const roleFromRoute = route.paramMap.get('role')?.toLowerCase(); // 'admin', 'entrepreneur', or 'client'

  // Get user and token from localStorage
  const userData = localStorage.getItem("user");
  const token = localStorage.getItem('token');
  let user: any = null;

  try {
    user = userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error("Invalid user data in localStorage", error);
    localStorage.removeItem("user"); // Clear corrupted data
    router.navigate(['/']);
    return false;
  }

  // Redirect to choose role if user is not authenticated
  if (!user || !user.role) {
    return false;
    
  }

  // Ensure user role matches the role from the route
  if (user.role.toLowerCase() !== roleFromRoute) {
    router.navigate(['/']);
    console.log("You are not authorized");
    return false;
  }

  // If token exists, check validity
  if (token) {
    try {
      const decodedToken: any = jwtDecode(token);
      const isExpired = decodedToken.exp * 1000 < Date.now(); // Convert exp to milliseconds

      if (isExpired) {
        console.log("Token expired. Redirecting to login.");
        localStorage.removeItem('token'); // Remove expired token
        router.navigate(['/login']);
        return false;
      }

      return true; // Token is valid, user is authorized
    } catch (error) {
      console.error("Invalid token:", error);
      localStorage.removeItem('token'); // Remove invalid token
      router.navigate(['/chooserole']);
      return false;
    }
  }

  console.log("No token found, but user role is valid.");
  return false; // Allow access if user role matches, even without a token
};
