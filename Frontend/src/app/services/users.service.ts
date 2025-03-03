import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiUrl = 'http://127.0.0.1:8000/api/v1/users';
  constructor(private http: HttpClient) { }
  createUser(user:any): Observable<any> {
      return this.http.post<any>(`${this.apiUrl}/create`, user);
  }
  getAllUsers(token:any): Observable<any> {
    const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
    });
    return this.http.get<any>(`${this.apiUrl}/getall`,{headers});
  }
  updateUser(user:any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${user._id}`,user);
  }
  deleteUser(id:any): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
