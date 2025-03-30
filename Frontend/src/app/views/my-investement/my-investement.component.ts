import { Component, OnInit } from '@angular/core';
import { InvestorService } from '../../services/investor.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-my-investement',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-investement.component.html',
  styleUrl: './my-investement.component.css'
})
export class MyInvestementComponent implements OnInit {
  token: string | null = null;
  investments: any[] = [];
  currentPage: number = 1;
  totalPages: number = 1;
  itemsPerPage: number = 5;

  constructor(private investorService: InvestorService) {}

  ngOnInit(): void {
    const userData = localStorage.getItem('user');
    this.token = localStorage.getItem('token');

    if (userData) {
      try {
        const user = JSON.parse(userData);
        if (user?._id) {
          this.fetchInvestmentsById(user._id);
        } else {
          console.error('User ID is missing in localStorage data');
        }
      } catch (error) {
        console.error('Error parsing user data from localStorage:', error);
      }
    } else {
      console.error('No user data found in localStorage');
    }
  }

  fetchInvestmentsById(id: string): void {
    if (!this.token) {
      console.error('Token is missing.');
      return;
    }

    this.investorService.getInvestmentById(id, this.token).subscribe(
      (response: any) => {
        if (response && response.data) {
          this.investments = response.data;
          this.totalPages = Math.ceil(this.investments.length / this.itemsPerPage);
        } else {
          console.error('Invalid response structure:', response);
        }
      },
      (error) => {
        console.error('Error fetching investments:', error);
      }
    );
  }

  paginatedInvestments(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.investments.slice(startIndex, startIndex + this.itemsPerPage);
  }
  getInvestmentClass(type: string): string {
    const typeColors: { [key: string]: string } = {
      'donation': 'bg-green-500',
      'equity-based investment': 'bg-blue-500',
      'reward-based investment': 'bg-yellow-500',
      'loan-based investment': 'bg-red-500'
    };
    return typeColors[type] || 'bg-gray-500'; // Default color if type is unknown
  }
  

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  trackByInvestment(index: number, investment: any): string {
    return investment._id; // Assuming each investment has a unique _id
  }
}
