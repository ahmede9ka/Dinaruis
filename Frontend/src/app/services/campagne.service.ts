import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CampagneService {

  private apiUrl = 'http://127.0.0.1:8000/api/v1';
    
  constructor(private http: HttpClient) {}

  getCampaigns(token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    return this.http.get<any>(`${this.apiUrl}/campaigns`, { headers });
  }
  getDonationByCampaign(campaign:any):Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/donation/getDonationByCampaign/${campaign}`);
  }
  getCampaignsByEntrepreneur(id:any,token:any):Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
    return this.http.get<any>(`${this.apiUrl}/campaigns/${id}`,{headers});
  }
  createCampaign(data:any,token:any):Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
    return this.http.post<any>(`${this.apiUrl}/campaigns/create`,data,{headers});
  }
}
