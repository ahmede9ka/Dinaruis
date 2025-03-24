import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  constructor(private http: HttpClient) { }
  TotalNumberOfCampaignsByStatus(token: string): Observable<any> {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      });
  
      return this.http.get<any>(`http://localhost:8000/api/v1/admin/campaignStatus`, { headers });
  }
  TotalNumberOfUsers(token:any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    return this.http.get<any>(`http://localhost:8000/api/v1/admin/userCounts`, { headers });
  }
  AllDonations(token:any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    return this.http.get<any>(`http://localhost:8000/api/v1/admin/allDonations`, { headers });
  }
  getDonationsByMonth(token:any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    return this.http.get<any>(`http://localhost:8000/api/v1/admin/allDonations`, { headers });
  }
  getCampaignsByCategory(token:any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    return this.http.get<any>(`http://localhost:8000/api/v1/admin/getCampaignsByCategory`, { headers });
  }
}
