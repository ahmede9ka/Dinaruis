import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  private apiUrl = 'http://127.0.0.1:8000/api/v1/transactions';
    constructor(private http: HttpClient) { }
    createUser(transaction:any): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/create`, transaction);
    }
    getAllTransactions(token:any): Observable<any> {
      const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
      });
      return this.http.get<any>(`${this.apiUrl}`,{headers});
    }
    getTransactionsById(id:any,token:any): Observable<any> {
      const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
      });
      return this.http.get<any>(`${this.apiUrl}/${id}`,{headers});
    }
}
