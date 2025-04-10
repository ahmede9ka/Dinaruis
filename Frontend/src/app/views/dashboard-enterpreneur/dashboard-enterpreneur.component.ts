import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import 'flowbite';
import { CampagneService } from '../../services/campagne.service';
import { EntrepreneurService } from '../../services/entrepreneur.service';

@Component({
  selector: 'app-dashboard-enterpreneur',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard-enterpreneur.component.html',
  styleUrls: ['./dashboard-enterpreneur.component.css']
})
export class DashboardEnterpreneurComponent implements OnInit, AfterViewInit {
  user: any;
  token: any;
  campaigns: any[] = [];
  nbcampaings: number = 0;
  totaldonations: number = 0;
  totalDonators: number = 0;
  EntrepreneurDonation: number = 0;
  EntrepreneurDonationMonth: number = 0;
  EntrepreneurDonationToday: number = 0;
  activeCampaigns: number = 0;
  completedCampaigns: number = 0;
  pendingCampaigns: number = 0;
  TotalUniqueInvestors: number = 0;
  months: any[] = [];
  monthsAmount: any[] = [];
  investments:any;
  investmentKeys:any;
  investmentValues:any;
  // Store chart instances
  private lineChart: Chart | null = null;
  private doughnutChart: Chart | null = null;
  private doughnutChart2: Chart | null = null;
  private barChart: Chart | null = null;

  constructor(private campaignservice: CampagneService, 
            private entrepreneurService: EntrepreneurService,
            ) {}

  ngOnInit() {
    const userData = localStorage.getItem('user');
    this.token = localStorage.getItem('token');
    
    if (userData) {
      this.user = JSON.parse(userData);
      this.fetchCampaignsOfEntrepreneur();
      this.getTotalDonators();

      this.entrepreneurService.getTotalDonations(this.user._id, this.token).subscribe((data: any) => {
        console.log(data);
        this.EntrepreneurDonation = data.totalDonations;
        this.EntrepreneurDonationMonth = data.totalDonationsThisMonth;
        this.EntrepreneurDonationToday = data.totalDonationsToday;
      });

      this.entrepreneurService.getCampaignStatusCount(this.user._id, this.token).subscribe((data: any) => {
        this.activeCampaigns = data.activeCampaigns;
        this.completedCampaigns = data.completedCampaigns;
        this.pendingCampaigns = data.pendingCampaigns;
      });

      this.entrepreneurService.getUniqueInvestorsByEntrepreneur(this.user._id, this.token).subscribe((data: any) => {
        this.TotalUniqueInvestors = data.totalUniqueInvestors;
      });

      this.entrepreneurService.getMonthlyCollectedAmount(this.user._id, this.token).subscribe((data: any) => {
        this.months = data.monthlyDonations.map((item: any) => item.month);
        this.monthsAmount = data.monthlyDonations.map((item: any) => item.totalAmount);
        this.initializeCharts();
      });
      this.entrepreneurService.getInvestmentTypeCount(this.user._id, this.token).subscribe((data: any) => {
        this.investments = data.investmentCounts;
      
        // Get the keys and values as separate arrays
        this.investmentKeys = Object.keys(this.investments);  // This will give you an array of keys
        this.investmentValues = Object.values(this.investments);  // This will give you an array of values
      
        console.log(this.investmentKeys);   // Output: ['donation', 'equity-based investment', 'loan-based investment', 'rewards-based investment']
        console.log(this.investmentValues); // Output: [2, 0, 0, 0]
      });
    }
  }

  ngAfterViewInit() {
    if (this.months.length && this.monthsAmount.length) {
      this.initializeCharts();
    }
  }

  fetchCampaignsOfEntrepreneur() {
    this.campaignservice.getCampaignsByEntrepreneur(this.user._id, this.token).subscribe((data: any) => {
      this.campaigns = data.data;
      this.nbcampaings = this.campaigns.length;

      this.campaigns.forEach((campaign) => {
        this.totaldonations += campaign.raisedAmount;
        this.campaignservice.getTotalContributors(campaign._id, this.token).subscribe((data) => {
          this.totalDonators += data.data["totalContributors"];
        });
      });
    });
  }

  getTotalDonators() {}

  // Chart Initialization Methods
  initializeCharts() {
    this.initLineChart();
    this.initDoughnutChart();
    this.initDoughnutChart2();
    this.initBarChart();
  }

  private initLineChart() {
    const canvas = document.getElementById('lineChart') as HTMLCanvasElement;
    if (!canvas || this.lineChart) return; // Prevent multiple instances

    this.lineChart = new Chart(canvas, {
      type: 'line',
      data: {
        labels: this.months,
        datasets: [{
          label: 'Funds Raised ($)',
          data: this.monthsAmount,
          borderColor: '#4CAF50',
          backgroundColor: 'rgba(76, 175, 80, 0.2)',
          fill: true,
        }]
      }
    });
  }

  private initDoughnutChart() {
    const canvas = document.getElementById('doughnutChart') as HTMLCanvasElement;
    if (!canvas || this.doughnutChart) return;

    this.doughnutChart = new Chart(canvas, {
      type: 'doughnut',
      data: {
        labels: ['Active', 'Completed', 'Pending'],
        datasets: [{
          data: [this.activeCampaigns, this.completedCampaigns, this.pendingCampaigns],
          backgroundColor: ['#4CAF50', '#FFD700', '#1F2937']
        }]
      }
    });
  }

  private initDoughnutChart2() {
    const canvas = document.getElementById('doughnutChart2') as HTMLCanvasElement;
    if (!canvas || this.doughnutChart2) return;

    this.doughnutChart2 = new Chart(canvas, {
      type: 'doughnut',
      data: {
        labels: this.investmentKeys,
        datasets: [{
          data: this.investmentValues, // Replace with dynamic values if available
          backgroundColor: ['#4CAF50', '#FFD700', '#1F2937']
        }]
      }
    });
  }

  private initBarChart() {
    const canvas = document.getElementById('barChart') as HTMLCanvasElement;
    if (!canvas || this.barChart) return;

    this.barChart = new Chart(canvas, {
      type: 'bar',
      data: {
        labels: this.campaigns.map(c => c.title),
        datasets: [{
          label: 'Funds Raised',
          data: this.campaigns.map(c => c.raisedAmount),
          backgroundColor: '#4CAF50'
        }]
      }
    });
  }
}
