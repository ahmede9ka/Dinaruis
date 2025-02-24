import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GoogleserviceService {

  private apiUrl = 'http://127.0.0.1:8000/api/v1/users/auth/google';

  constructor(private http: HttpClient) {}

  // This function can be used to initiate the Google authentication flow
  Login(role: any): void {
    window.location.href = `${this.apiUrl}?role=${role}`;
  }
  handleGoogleCallback(code: any, state: any): Observable<any> {
    return this.http.get('http://127.0.0.1:8000/api/v1/users/auth/google/callback', {
      params: { code, state },
      withCredentials: true,
    });
  }
}
