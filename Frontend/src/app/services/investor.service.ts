import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class InvestorService {

  private apiUrl = 'http://127.0.0.1:8000/api/v1/investor';
      
    constructor(private http: HttpClient) {}
  
    getInvestmentById(id:any,token: string): Observable<any> {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      });
      return this.http.get<any>(`${this.apiUrl}/getInvestment/${id}`, { headers });
    }
    getInvestment(id:any,token: string): Observable<any> {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      });
      return this.http.get<any>(`${this.apiUrl}/getInvestment`, { headers });
    }
    Invest(data:any,token: string): Observable<any> {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      });
      return this.http.post<any>(`${this.apiUrl}/donate`,data, { headers });
    }
}
