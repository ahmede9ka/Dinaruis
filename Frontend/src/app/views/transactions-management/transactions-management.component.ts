import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../../services/transaction.service';
import { CommonModule } from '@angular/common';
import { LucideAngularModule,Eye } from 'lucide-angular';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-transactions-management',
  standalone: true,
  imports: [CommonModule,LucideAngularModule,FormsModule],
  templateUrl: './transactions-management.component.html',
  styleUrl: './transactions-management.component.css'
})
export class TransactionsManagementComponent implements OnInit {
  icons = { Eye };
  token: any;
  transactions: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 6; // Change as needed
  activeModal: string | null = null;
    selectedTransaction: any = null;

    openModal(modalId: string, transaction: any) {
        this.activeModal = modalId;
        this.selectedTransaction = transaction;
    }

    closeModal() {
        this.activeModal = null;
        this.selectedTransaction = null;
    }

  constructor(private transactionservice: TransactionService) {}

  ngOnInit() {
    this.token = localStorage.getItem("token");
    this.fetchTransactions();
  }

  fetchTransactions() {
    this.transactionservice.getAllTransactions(this.token).subscribe((data: any) => {
      console.log(data);
      this.transactions = data.data;
    });
  }

  get totalPages(): number {
    return Math.ceil(this.transactions.length / this.itemsPerPage);
  }

  paginatedTransactions(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.transactions.slice(startIndex, endIndex);
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }
}
