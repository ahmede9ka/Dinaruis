import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TransactionService } from '../../services/transaction.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-funding-requests',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './funding-requests.component.html',
  styleUrls: ['./funding-requests.component.css']
})
export class FundingRequestsComponent implements OnInit {
  token: any;
  user: any;
  transactions: any[] = [];
  currentPage: number = 1; // Current page for pagination
  itemsPerPage: number = 1; // Number of items to show per page

  constructor(
    private router: Router,
    private transactionService: TransactionService
  ) {}

  ngOnInit() {
    const userData = localStorage.getItem('user');
    this.token = localStorage.getItem('token');
    
    if (userData && this.token) {
      this.user = JSON.parse(userData);
      this.transactionService.getTransactionEnt(this.user._id, this.token).subscribe((data: any) => {
        this.transactions = data;
        console.log(this.transactions)
      });
    }
  }

  // Paginated transactions data
  paginatedFunds(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.transactions.slice(startIndex, endIndex);
  }

  // Calculate total pages
  get totalPages(): number {
    return Math.ceil(this.transactions.length / this.itemsPerPage);
  }

  // Navigate to the previous page
  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  // Navigate to the next page
  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }
}
