import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import 'flowbite';
import { InvestorService } from '../../services/investor.service';

@Component({
  selector: 'app-dashboard-investiseur',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard-investiseur.component.html',
  styleUrls: ['./dashboard-investiseur.component.css'] // ✅ fixed
})
export class DashboardInvestiseurComponent implements OnInit {
  totalInvesti: number = 500000;
  totalProjetsSoutenus: number = 30;
  selectedTimeRange: string = 'Mois';
  timeRanges: string[] = ['Jour', 'Semaine', 'Mois'];
  dropdownOpen: boolean = false;
  token: any;
  user: any;
  months: any[] = [];
  monthsAmount: any[] = [];
  totalInvestment: any;
  advice: string = "";
  supportedProjects: number = 0;

  investmentTypes = [
    "donation",
    "equity-based investment",
    "loan-based investment",
    "rewards-based investment"
  ];
  investmentTypescount = [0, 0, 0, 0];
  keys: any[] = [];
  values: any[] = [];

  // Chart instances to manage and destroy
  charts: any = {};

  constructor(private investorService: InvestorService) {}

  ngOnInit() {
    const userData = localStorage.getItem('user');
    this.token = localStorage.getItem('token');

    if (userData) {
      this.user = JSON.parse(userData);

      this.investorService.getMonthlyInvestment(this.user._id, this.token).subscribe((data: any) => {
        this.months = data.investmentByMonth.map((item: any) => item.month);
        this.monthsAmount = data.investmentByMonth.map((item: any) => item.totalAmount);

        this.checkAndCreateCharts(); // call after data is ready
      });

      this.investorService.getTotalInvestment(this.user._id, this.token).subscribe((data: any) => {
        this.totalInvestment = data.totalInvestment;
      });

      this.investorService.getAdvice(this.token).subscribe((data: any) => {
        this.advice = data.advice;
      });

      this.investorService.getSupportedProjectCount(this.user._id, this.token).subscribe((data: any) => {
        this.supportedProjects = data.supportedProjectsCount;
      });

      this.investorService.getInvestmentTypeCountForInvestor(this.user._id, this.token).subscribe((data: any) => {
        const dt = data.investmentTypeCounts;
        this.investmentTypescount[0] += dt["donation"] || 0;
        this.investmentTypescount[1] += dt["equity-based investment"] || 0;
        this.investmentTypescount[2] += dt["loan-based investment"] || 0;
        this.investmentTypescount[3] += dt["rewards-based investment"] || 0;

        this.checkAndCreateCharts();
      });

      this.investorService.countCampaignTypesInvestorInvestedIn(this.user._id, this.token).subscribe((data: any) => {
        this.keys = Object.keys(data.campaignTypeInvestments);
        this.values = Object.values(data.campaignTypeInvestments);

        this.checkAndCreateCharts();
      });
    }
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  selectTimeRange(option: string) {
    this.selectedTimeRange = option;
    this.toggleDropdown();
    this.updateCharts();
  }

  checkAndCreateCharts() {
    if (this.months.length && this.monthsAmount.length && this.keys.length && this.values.length) {
      this.createCharts();
    }
  }

  createCharts() {
    // Destroy existing charts if they exist
    Object.values(this.charts).forEach((chart: any) => chart?.destroy());

    // Evolution des Investissements (Line Chart)
    this.charts.evolution = new Chart('evolutionChart', {
      type: 'line',
      data: {
        labels: this.months,
        datasets: [{
          label: 'Investissement total',
          data: this.monthsAmount,
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

    // Répartition des Investissements (Doughnut Chart)
    this.charts.repartition = new Chart('repartitionChart', {
      type: 'doughnut',
      data: {
        labels: this.investmentTypes,
        datasets: [{
          label: 'Répartition des investissements',
          data: this.investmentTypescount,
          backgroundColor: ['#FFD700', '#4CAF50', '#1F2937', '#FF5722'],
          borderWidth: 1
        }]
      },
      options: { responsive: true }
    });

    // Investissements par Type (Bar Chart)
    this.charts.investissementsType = new Chart('investissementsTypeChart', {
      type: 'bar',
      data: {
        labels: this.keys,
        datasets: [{
          label: 'Investissements par type',
          data: this.values,
          backgroundColor: 'rgba(76, 175, 80, 0.2)',
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

    // Comparaison avec Investissements Précédents (Bar Chart)
    this.charts.comparaison = new Chart('comparaisonChart', {
      type: 'bar',
      data: {
        labels: this.months,
        datasets: [{
          label: 'Investissements précédents',
          data: this.monthsAmount,
          backgroundColor: '#FFD700',
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

  updateCharts() {
    console.log('Selected Time Range:', this.selectedTimeRange);
    // Add logic to update charts based on selected time range
  }
}
