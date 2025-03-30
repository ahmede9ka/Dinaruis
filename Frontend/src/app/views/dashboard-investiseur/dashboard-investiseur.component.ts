import { CommonModule } from '@angular/common';
import { Component,AfterViewInit, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import 'flowbite';
import { InvestorService } from '../../services/investor.service';
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
  token:any;
  user:any;
  months:any;
  monthsAmount:any;
  totalInvestment:any;
  advice:string="";
  supportedProjects:number=0;
  investmentTypes = [ "donation",
    "equity-based investment",
    "loan-based investment",
    "rewards-based investment",]
  investmentTypescount=[0,0,0,0]
  keys:any;
  values:any;
  // Charts data (mock data for demonstration)
  evolutionData: any = [100000, 150000, 250000, 400000, 500000];  // Investment over time
  repartitionData: any = [40, 30, 15, 15];  // Investment distribution by sectors
  investissementsTypeData: any = [40, 30, 20, 10];  // Investment by type (loans, donations, etc.)
  comparaisonData: any = [100000, 150000, 250000, 450000, 500000];  // Comparison with previous investments
  constructor(private investorService:InvestorService){}
  ngOnInit() {
    const userData = localStorage.getItem('user');
    this.token = localStorage.getItem('token');
    if (userData) {
      this.user = JSON.parse(userData);
      this.investorService.getMonthlyInvestment(this.user._id,this.token).subscribe((data:any)=>{
        this.months = data.investmentByMonth.map((item:any)=>item.month);
        this.monthsAmount = data.investmentByMonth.map((item:any)=>item.totalAmount);
        console.log(this.months);
        console.log(this.monthsAmount)
        this.createCharts();
      })
      this.investorService.getTotalInvestment(this.user._id,this.token).subscribe((data:any)=>{
        this.totalInvestment  = data.totalInvestment;
      })
      this.investorService.getAdvice(this.token).subscribe((data:any)=>{
        this.advice  = data.advice;
      })
      this.investorService.getSupportedProjectCount(this.user._id,this.token).subscribe((data:any)=>{
        this.supportedProjects = data.supportedProjectsCount;
      })
      this.investorService.getInvestmentTypeCountForInvestor(this.user._id,this.token).subscribe((data:any)=>{
        const dt = data.investmentTypeCounts
        this.investmentTypescount[0]+=dt["donation"];
        this.investmentTypescount[1]+=dt["equity-based investment"]
        this.investmentTypescount[2]+=dt["loan-based investment"];
        this.investmentTypescount[3]+=dt["rewards-based investment"];
      })
      this.investorService.countCampaignTypesInvestorInvestedIn(this.user._id, this.token).subscribe((data: any) => {
        this.keys = Object.keys(data.campaignTypeInvestments);
        this.values = Object.values(data.campaignTypeInvestments);
        console.log(this.keys);
        console.log(this.values);
      });
    }
    
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
        labels: this.months,  // Time periods (can adjust based on time range)
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
        labels: this.investmentTypes,
        datasets: [{
          label: 'Répartition des investissements',
          data: this.investmentTypescount,
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
        labels: this.keys,
        datasets: [{
          label: 'Investissements par type',
          data: this.values,
          backgroundColor:'rgba(76, 175, 80, 0.2)',
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