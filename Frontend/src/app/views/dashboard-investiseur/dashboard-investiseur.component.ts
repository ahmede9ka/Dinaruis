import { CommonModule } from '@angular/common';
import { Component,AfterViewInit, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import 'flowbite';
@Component({
  selector: 'app-dashboard-investiseur',
  standalone:true,
  imports: [CommonModule],
  templateUrl: './dashboard-investiseur.component.html',
  styleUrl: './dashboard-investiseur.component.css'
})
export class DashboardInvestiseurComponent implements OnInit {
  // Data model
  totalInvesti: number = 500000;  // Example total invested value
  totalProjetsSoutenus: number = 30;  // Example number of projects supported
  selectedTimeRange: string = 'Mois';  // Default time range for chart
  timeRanges: string[] = ['Jour', 'Semaine', 'Mois'];  // Time range options
  dropdownOpen: boolean = false;  // Dropdown state

  // Charts data (mock data for demonstration)
  evolutionData: any = [100000, 150000, 250000, 400000, 500000];  // Investment over time
  repartitionData: any = [40, 30, 15, 15];  // Investment distribution by sectors
  investissementsTypeData: any = [40, 30, 20, 10];  // Investment by type (loans, donations, etc.)
  comparaisonData: any = [100000, 150000, 250000, 450000, 500000];  // Comparison with previous investments

  ngOnInit() {
    this.createCharts();
  }

  // Toggle dropdown for time range selection
  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  // Select time range from the dropdown
  selectTimeRange(option: string) {
    this.selectedTimeRange = option;
    this.toggleDropdown();
    // Update the charts based on the selected time range (if needed)
    this.updateCharts();
  }

  // Method to create all the charts
  createCharts() {
    // Evolution des Investissements (Line Chart)
    new Chart('evolutionChart', {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],  // Time periods (can adjust based on time range)
        datasets: [{
          label: 'Investissement total',
          data: this.evolutionData,
          borderColor: '#4CAF50',
          backgroundColor: 'rgba(76, 175, 80, 0.2)',
          borderWidth: 2,
          fill: true
        }]
      },
      options: {
        responsive: true,
        scales: {
          x: {
            beginAtZero: true
          },
          y: {
            beginAtZero: true
          }
        }
      }
    });

    // Répartition des Investissements (Doughnut Chart)
    new Chart('repartitionChart', {
      type: 'doughnut',
      data: {
        labels: ['Projets favori', 'Projets sectoriels', 'Autres'],
        datasets: [{
          label: 'Répartition des investissements',
          data: this.repartitionData,
          backgroundColor: ['#FFD700', '#4CAF50', '#1F2937'],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true
      }
    });

    // Investissements par Type (Bar Chart)
    new Chart('investissementsTypeChart', {
      type: 'bar',
      data: {
        labels: ['Prêts', 'Dons', 'Participation au capital', 'Autres'],
        datasets: [{
          label: 'Investissements par type',
          data: this.investissementsTypeData,
          backgroundColor: '#1F2937',
          borderColor: '#4CAF50',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: {
          x: {
            beginAtZero: true
          },
          y: {
            beginAtZero: true
          }
        }
      }
    });

    // Comparaison avec Investissements Précédents (Bar Chart)
    new Chart('comparaisonChart', {
      type: 'bar',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
        datasets: [{
          label: 'Investissements précédents',
          data: this.comparaisonData,
          backgroundColor: '#FFD700',
          borderColor: '#1F2937',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: {
          x: {
            beginAtZero: true
          },
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  // Method to update charts based on selected time range
  updateCharts() {
    // For now, it can just update the charts or fetch new data based on the time range.
    // You can implement custom logic here for dynamic data updates.
    console.log('Selected Time Range:', this.selectedTimeRange);
  }
}