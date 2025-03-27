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
  getTotalContributors(id:any,token:any):Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
    return this.http.get<any>(`${this.apiUrl}/campaigns/unique/contributors/${id}`,{headers});
  }
  getCampaignById(id:any,token:any):Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
    return this.http.get<any>(`${this.apiUrl}/campaigns/getcampaign/${id}`,{headers});
  }
  updateCampaign(id:any,data:any,token:any):Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
    return this.http.put<any>(`${this.apiUrl}/campaigns/${id}`,data,{headers});
  }
  deleteCampaign(id:any,token:any):Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
    return this.http.delete<any>(`${this.apiUrl}/campaigns/${id}`,{headers});
  }
  AddFavorite(campaign_id:any,investor_id:any,token:any):Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
    return this.http.get<any>(`${this.apiUrl}/campaigns/addFavorite/${campaign_id}/${investor_id}`,{headers});
  }
  getFavoriteByInvestorId(investor_id:any,token:any):Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
    return this.http.get<any>(`${this.apiUrl}/campaigns/getFavorite/${investor_id}`,{headers});
  }
}
