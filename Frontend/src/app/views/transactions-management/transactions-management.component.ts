import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../../services/transaction.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-transactions-management',
  standalone:true,
  imports: [CommonModule],
  templateUrl: './transactions-management.component.html',
  styleUrl: './transactions-management.component.css'
})
export class TransactionsManagementComponent implements OnInit{
  token:any;
  transactions:any;
  constructor(private transactionservice:TransactionService){}
  ngOnInit(){
    this.token = localStorage.getItem("token");
    this.transactionservice.getAllTransactions(this.token).subscribe((data:any)=>{
      console.log(data);
      this.transactions = data.data;
    })
  }
}
