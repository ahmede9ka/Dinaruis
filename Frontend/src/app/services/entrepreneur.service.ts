import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EntrepreneurService {
  private apiUrl = 'http://127.0.0.1:8000/api/v1/entrepreneur';

  constructor(private http: HttpClient) { }
  getTotalDonations(id:any,token: string): Observable<any> {
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        });
        return this.http.get<any>(`${this.apiUrl}/getTotalDonationsByEntrepreneur/${id}`, { headers });
    }
    getCampaignStatusCount(id:any,token: string): Observable<any> {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      });
      return this.http.get<any>(`${this.apiUrl}/getCampaignStatusCount/${id}`, { headers });
  }
  getUniqueInvestorsByEntrepreneur(id:any,token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
    return this.http.get<any>(`${this.apiUrl}/getUniqueInvestorsByEntrepreneur/${id}`, { headers });
  }
  getMonthlyCollectedAmount(id:any,token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
    return this.http.get<any>(`${this.apiUrl}/getMonthlyCollectedAmount/${id}`, { headers });
  }
}
