import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import 'flowbite';
import { CampagneService } from '../../services/campagne.service';
import { EntrepreneurService } from '../../services/entrepreneur.service';


interface Campaign {
  _id:string;
  title: string;
  description: string;
  amountGoal: number;
  image: string;
  images: string[];
  startDate: Date;
  endDate: Date;
  localisation: string;
  type: string;
  code_postal: string;
  user: string;
  progress: number; // Added this
  isFavorite: boolean; // Added this
  raisedAmount:number;
}
@Component({
  selector: 'app-dashboard-enterpreneur',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard-enterpreneur.component.html',
  styleUrls: ['./dashboard-enterpreneur.component.css']
})
export class DashboardEnterpreneurComponent implements OnInit, AfterViewInit {
  user: any;

  totalCollected: number = 12500; // Example: Total collected amount
  totalCampaigns = { active: 3, completed: 7, pending: 2 };
  
  totalContributors: number = 320;
  newContributors: number = 20;

  selectedTimeRange: string = 'Select Time Range'; // Default text
  dropdownOpen: boolean = false;
  timeRanges: string[] = ['Last 24 hours', 'Last Week', 'Last Month', 'Last 3 Months']; // Example options
  token:any;
  campaigns: Campaign[] = []; 
  nbcampaings:number=0;
  totaldonations:number=0;
  totalDonators:number=0;
  EntrepreneurDonation:number=0;
  EntrepreneurDonationMonth:number=0;
  EntrepreneurDonationToday:number=0;
  activeCampaigns:number=0;
  completedCampaigns:number=0;
  pendingCampaigns:number=0;
  TotalUniqueInvestors:number=0;
  months:any;
  monthsAmount:any;
  constructor(private campaignservice:CampagneService,
              private entrepreneurService:EntrepreneurService
  ) {}

  ngOnInit() {
    const userData = localStorage.getItem('user');
    this.token = localStorage.getItem('token');
    if (userData) {
      this.user = JSON.parse(userData);
      console.log(this.user.firstName);
      this.fetchCampaignsOfEntrepreneur();
      this.getTotalDonators();
      this.entrepreneurService.getTotalDonations(this.user._id,this.token).subscribe((data:any)=>{
        this.EntrepreneurDonation = data.totalDonations;
        this.EntrepreneurDonationMonth = data.totalDonationsThisMonth;
        this.EntrepreneurDonationToday = data.totalDonationsToday;
      })
      this.entrepreneurService.getCampaignStatusCount(this.user._id,this.token).subscribe((data:any)=>{
        this.activeCampaigns = data.activeCampaigns;
        this.completedCampaigns = data.completedCampaigns;
        this.pendingCampaigns = data.pendingCampaigns;
      })
      this.entrepreneurService.getUniqueInvestorsByEntrepreneur(this.user._id,this.token).subscribe((data:any)=>{
        this.TotalUniqueInvestors = data.totalUniqueInvestors;
      })
      this.entrepreneurService.getMonthlyCollectedAmount(this.user._id,this.token).subscribe((data:any)=>{
        this.months = data.monthlyDonations.map((item:any)=>item.month);
        this.monthsAmount = data.monthlyDonations.map((item:any)=>item.totalAmount);
        console.log(this.months);
        console.log(this.monthsAmount);
        this.initializeCharts();
      })
    }
  }
  fetchCampaignsOfEntrepreneur(){
    this.campaignservice.getCampaignsByEntrepreneur(this.user._id,this.token).subscribe((data:any)=>{
      this.campaigns = data.data;
      this.nbcampaings = this.campaigns.length;
      this.campaigns.forEach(element => {
        this.totaldonations = element.raisedAmount;
        this.campaignservice.getTotalContributors(element._id,this.token).subscribe((data)=>{
          console.log(data);
          this.totalDonators = data.data["totalContributors"];
          console.log(this.totalDonators);
        })
      });
      console.log(data);
    })
  }
  getTotalDonators(){

    
  }
  ngAfterViewInit() {
    this.initializeCharts();
  }

  // Dropdown methods
  toggleDropdown(): void {
    this.dropdownOpen = !this.dropdownOpen; // Toggle dropdown visibility
  }

  selectTimeRange(option: string): void {
    this.selectedTimeRange = option; // Set the selected option
    this.dropdownOpen = false; // Close dropdown after selection
  }

  // Chart initialization methods
  initializeCharts(): void {
    const lineChartCanvas = document.getElementById('lineChart') as HTMLCanvasElement;
    if (lineChartCanvas) {
      new Chart(lineChartCanvas, {
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

    const doughnutChartCanvas = document.getElementById('doughnutChart') as HTMLCanvasElement;
    if (doughnutChartCanvas) {
      new Chart(doughnutChartCanvas, {
        type: 'doughnut',
        data: {
          labels: ['Active', 'Completed', 'Pending'],
          datasets: [{
            data: [3, 7, 2],
            backgroundColor: ['#4CAF50', '#FFD700', '#1F2937']
          }]
        }
      });
    }
    const doughnutChart2Canvas = document.getElementById('doughnutChart2') as HTMLCanvasElement;
    if (doughnutChart2Canvas) {
      new Chart(doughnutChart2Canvas, {
        type: 'doughnut',
        data: {
          labels: ['environement', 'education', 'bussiness'],
          datasets: [{
            data: [3, 7, 2],
            backgroundColor: ['#4CAF50', '#FFD700', '#1F2937']
          }]
        }
      });
    }

    const barChartCanvas = document.getElementById('barChart') as HTMLCanvasElement;
    if (barChartCanvas) {
      new Chart(barChartCanvas, {
        type: 'bar',
        data: {
          labels: ['Project A', 'Project B', 'Project C'],
          datasets: [{
            label: 'Funds Raised',
            data: [5000, 7000, 8000],
            backgroundColor: '#4CAF50'
          }]
        }
      });
    }
  }
}
