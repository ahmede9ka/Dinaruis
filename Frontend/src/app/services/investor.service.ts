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
    getAllInvestors(token: string): Observable<any> {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      });
      return this.http.get<any>(`${this.apiUrl}/getInvestors`, { headers });
    }
    getTotalInvestment(id:any,token: string): Observable<any> {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      });
      return this.http.get<any>(`${this.apiUrl}/getTotalInvestment/${id}`, { headers });
    }
    getSupportedProjectCount(id:any,token: string): Observable<any> {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      });
      return this.http.get<any>(`${this.apiUrl}/getSupportedProjectsCount/${id}`, { headers });
    }
    getAdvice(token: string): Observable<any> {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      });
      return this.http.get<any>(`${this.apiUrl}/getAdvice`, { headers });
    }
    getMonthlyInvestment(id:any,token: string): Observable<any> {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      });
      return this.http.get<any>(`${this.apiUrl}/getMonthlyInvestment/${id}`, { headers });
    }
    getInvestmentTypeCountForInvestor(id:any,token: string): Observable<any> {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      });
      return this.http.get<any>(`http://localhost:8000/api/v1/investor/getInvestmentTypeCountForInvestor/${id}`, { headers });
    }
    countCampaignTypesInvestorInvestedIn(id:any,token: string): Observable<any> {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      });
      return this.http.get<any>(`http://localhost:8000/api/v1/investor/countCampaignTypesInvestorInvestedIn/${id}`, { headers });
    }
}
