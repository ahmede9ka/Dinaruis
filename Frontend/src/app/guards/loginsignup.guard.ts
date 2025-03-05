import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

export const loginsignupGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  // Get user and token from localStorage
  const userData = localStorage.getItem("user");
  const token = localStorage.getItem('token');

  let user: any = null;

  try {
    user = userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error("Invalid user data in localStorage", error);
    localStorage.removeItem("user"); // Clear corrupted data
  }

  // If token exists, check validity
  if (token) {
    try {
      const decodedToken: any = jwtDecode(token);
      const isExpired = decodedToken.exp * 1000 < Date.now(); // Convert exp to milliseconds

      if (!isExpired && user && user.role) {
        console.log("User is already logged in. Redirecting...");
        router.navigate([`/${user.role.toLowerCase()}/dashboard`]); // Redirect to role-based dashboard
        return false; // Prevent access to login/signup
      }
    } catch (error) {
      console.error("Invalid token:", error);
      localStorage.removeItem('token'); // Remove invalid token
    }
  }

  // Allow access to login/signup if user is not logged in
  return true;
};
