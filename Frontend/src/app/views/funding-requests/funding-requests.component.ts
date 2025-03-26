import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TransactionService } from '../../services/transaction.service';

@Component({
  selector: 'app-funding-requests',
  standalone:true,
  imports: [],
  templateUrl: './funding-requests.component.html',
  styleUrl: './funding-requests.component.css'
})
export class FundingRequestsComponent implements OnInit{
  token:any;
  user:any;
  transactions:any;
  constructor(private router:Router,
              private transactionService:TransactionService
  ){

  }
  ngOnInit(){
    const userData = localStorage.getItem('user');
    this.token = localStorage.getItem('token');
    if (userData) {
      this.user = JSON.parse(userData);
      this.transactionService.getTransactionEnt(this.user._id,this.token).subscribe((data:any)=>{
        this.transactions = data.data;
      })
    }
    
  }
}
