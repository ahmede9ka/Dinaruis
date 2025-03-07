import { Component,OnInit  } from '@angular/core';


import { Chart } from 'chart.js';
import ApexCharts from 'apexcharts';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-dashboard-admin',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard-admin.component.html',
  styleUrl: './dashboard-admin.component.css'
})
export class DashboardAdminComponent implements OnInit {
  topInvestors = [
    { name: 'Investor A', totalInvested: 150000, numberOfProjects: 10, photo: 'https://picsum.photos/40/40?random=1' },
    { name: 'Investor B', totalInvested: 120000, numberOfProjects: 8, photo: 'https://picsum.photos/40/40?random=2' },
    { name: 'Investor C', totalInvested: 100000, numberOfProjects: 7, photo: 'https://picsum.photos/40/40?random=3' },
    { name: 'Investor D', totalInvested: 95000, numberOfProjects: 6, photo: 'https://picsum.photos/40/40?random=4' },
    { name: 'Investor E', totalInvested: 90000, numberOfProjects: 5, photo: 'https://picsum.photos/40/40?random=5' },
  ];
  // Data Model (sample values, replace with dynamic data later)
  totalCollecte: number = 1000000;  // Example total amount collected
  totalCampagnes: number = 50;  // Example total number of campaigns
  totalUtilisateurs: number = 2000;  // Example total number of users
  totalContributions: number = 5000;  // Example number of contributions
  demandesEnAttente: number = 10;  // Example number of pending campaigns
  selectedTimeRange: string = 'Mois';  // Default time range for chart

  // Graph Data (mock data for charts)
  fondsCollectesData: any = [50000, 100000, 200000, 400000, 500000];  // Fund collection over time
  repartitionCampagnesData: any = [30, 20, 25, 25];  // Distribution of campaigns by category
  campagneValidationData: any = [2, 3, 5, 4, 7];  // Pending campaigns for validation

  ngOnInit() {
    this.createCharts();
  }

  // Create charts for visual representation
  createCharts() {
    // Evolution des Fonds Collectés (Line Chart)
    new Chart('fondsCollectesChart', {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],  // Example time periods (can adjust)
        datasets: [{
          label: 'Fonds collectés',
          data: this.fondsCollectesData,
          borderColor: '#FF5733',
          backgroundColor: 'rgba(255, 87, 51, 0.2)',
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

    // Répartition des Campagnes (Doughnut Chart)
    new Chart('repartitionCampagnesChart', {
      type: 'doughnut',
      data: {
        labels: ['Technologie', 'Social', 'Environnement', 'Autres'],
        datasets: [{
          label: 'Répartition des campagnes',
          data: this.repartitionCampagnesData,
          backgroundColor: ['#FF5733', '#33FF57', '#33A8FF', '#FFD700'],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true
      }
    });

    // Campagnes en Attente de Validation (Bar Chart)
    new Chart('campagneValidationChart', {
      type: 'bar',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
        datasets: [{
          label: 'Demandes de campagne',
          data: this.campagneValidationData,
          backgroundColor: '#FF5733',
          borderColor: '#1F2937',
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

  // Filter data based on time range (day/week/month)
  filterData(timeRange: string) {
    this.selectedTimeRange = timeRange;
    // Fetch or update chart data based on the selected time range
    console.log('Selected Time Range:', this.selectedTimeRange);
  }
}