import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../services/admin.service';
import { CampagneService } from '../../services/campagne.service';
import { InvestorService } from '../../services/investor.service';
import { TransactionService } from '../../services/transaction.service';

@Component({
  selector: 'app-dashboard-admin',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard-admin.component.html',
  styleUrl: './dashboard-admin.component.css'
})
export class DashboardAdminComponent implements OnInit {
  numberOfUsers: number = 0;
  users: any;
  token: any;
  totalAmount: number = 0;
  totalAmountThisMonth: number = 0;
  totalAmountToday: number = 0;
  nbcampaigns: number = 0;
  donationsByMonth: any;
  category: any;
  datacategory: any;
  status:any;
  countstatus:any;
  pending:any;
  nbInvestors:any;
  nbTransactions:any;
  user:any;
  constructor(private adminService: AdminService,
     private campagneService: CampagneService,
    private investorService:InvestorService,
    private transactionService:TransactionService) {}

  ngOnInit() {
    const userData = localStorage.getItem('user');
    this.token = localStorage.getItem('token');
    
    if (userData) {
      this.user = JSON.parse(userData);
      this.adminService.TotalNumberOfUsers(this.token).subscribe((data: any) => {
        this.users = data.data;
        this.numberOfUsers = this.users["INVESTOR"] + this.users["ENTREPRENEUR"] + this.users["ADMIN"];
      });
  
      this.adminService.AllDonations(this.token).subscribe((data: any) => {
        this.totalAmount = data.data.totalAmount;
        this.totalAmountThisMonth = data.data.totalAmountThisMonth;
        this.totalAmountToday = data.data.totalAmountToday;
      });
  
      this.campagneService.getCampaigns(this.token).subscribe((data: any) => {
        this.nbcampaigns = data.data.length;
      });
  
      this.adminService.getDonationsByMonth(this.token).subscribe((data: any) => {
        this.donationsByMonth = data.data;
        this.createFondsCollectesChart();
      });
  
      this.adminService.getCampaignsByCategory(this.token).subscribe((data: any) => {
        console.log(data);
        this.category = data.data.map((item: any) => item.category);
        this.datacategory = data.data.map((item: any) => item.count);
        console.log(this.category);
        console.log(this.datacategory)
        this.createRepartitionCampagnesChart();
      });
      this.adminService.TotalNumberOfCampaignsByStatus(this.token).subscribe((data: any) => {
        if (!data || !data.data || !data.data.statusCounts) return; // Ensure data exists
      
        this.status = data.data.statusCounts.map((item: any) => item.status);
        this.countstatus = data.data.statusCounts.map((item: any) => item.count);
      
        console.log(this.status);
      
        for (let i = 0; i < this.status.length; i++) {  // Fixed `length` typo
          console.log(this.status[i]);
          if (this.status[i] === "Pending") {
            this.pending = this.countstatus[i];
            break;
          }
        }
      
        this.createCampagneValidationChart();
      });
      this.investorService.getAllInvestors(this.token).subscribe((data:any)=>{
        this.nbInvestors = data.data.length;
      })
      this.transactionService.getAllTransactions(this.token).subscribe((data:any)=>{
        this.nbTransactions = data.data.length;
      })
      //console.log(this.pending);
      this.adminService.getTopInvestors(this.user._id,this.token).subscribe((data:any)=>{
        console.log(data);
      })
    }
    
  }

  // Function to create Fonds Collectés Chart (Line Chart)
  createFondsCollectesChart() {
    new Chart('fondsCollectesChart', {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [{
          label: 'Fonds collectés',
          data: this.donationsByMonth,
          borderColor: '#4CAF50',
          backgroundColor: 'rgba(76, 175, 80, 0.2)',
          borderWidth: 2,
          fill: true
        }]
      },
      options: {
        responsive: true,
        scales: {
          x: { beginAtZero: true },
          y: { beginAtZero: true }
        }
      }
    });
  }

  // Function to create Répartition des Campagnes Chart (Doughnut Chart)
  createRepartitionCampagnesChart() {
    if (!this.category || !this.datacategory) return;

    const backgroundColors = this.category.map(() => this.getRandomColor());

    new Chart('repartitionCampagnesChart', {
      type: 'doughnut',
      data: {
        labels: this.category,
        datasets: [{
          label: 'Répartition des campagnes',
          data: this.datacategory,
          backgroundColor: backgroundColors,
          borderWidth: 1
        }]
      },
      options: {
        responsive: true
      }
    });
  }

  // Function to create Campagnes en Attente de Validation Chart (Bar Chart)
  createCampagneValidationChart() {
    new Chart('campagneValidationChart', {
      type: 'bar',
      data: {
        labels: this.status,
        datasets: [{
          label: 'Status count',
          data: this.countstatus, // Static data (can be updated dynamically)
          backgroundColor: 'rgba(76, 175, 80, 0.5)',
          borderColor: '#4CAF50',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: {
          x: { beginAtZero: true },
          y: { beginAtZero: true }
        }
      }
    });
  }

  // Function to generate a random color
  getRandomColor() {
    const blueOrGreen = Math.random() < 0.5 ? 'green' : 'blue';
    
    if (blueOrGreen === 'green') {
      // Generate a shade of green
      const r = Math.floor(Math.random() * 56);  // Keep red low (0-55)
      const g = Math.floor(Math.random() * 156) + 100;  // Green dominant (100-255)
      const b = Math.floor(Math.random() * 56);  // Keep blue low (0-55)
      return `rgb(${r}, ${g}, ${b})`;
    } else {
      // Generate a shade of blue
      const r = Math.floor(Math.random() * 56);  // Keep red low (0-55)
      const g = Math.floor(Math.random() * 56);  // Keep green low (0-55)
      const b = Math.floor(Math.random() * 156) + 100;  // Blue dominant (100-255)
      return `rgb(${r}, ${g}, ${b})`;
    }
  }
}
