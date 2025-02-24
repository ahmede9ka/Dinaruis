import { Injectable } from '@angular/core';
import {jwtDecode} from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private token: string | null = null;

  constructor() {
    this.token = this.getTokenFromCookie();
  }

  // Get the JWT token from the cookie
  private getTokenFromCookie(): string | null {
    const match = document.cookie.match(/(^|;)\s*jwt=([^;]+)/);
    return match ? match[2] : null;
  }

  // Decode the token to get user data
  decodeToken(): any {
    if (this.token) {
      return jwtDecode(this.token);
    }
    return null;
  }

  // Optional: Method to check if the user is authenticated
  isAuthenticated(): boolean {
    return !!this.token;
  }
}
