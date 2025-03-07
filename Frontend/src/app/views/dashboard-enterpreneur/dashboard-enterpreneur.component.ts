import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import 'flowbite';

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
  activeCampaigns = [
    { name: 'Project A', progress: 75, daysLeft: 10 },
    { name: 'Project B', progress: 50, daysLeft: 5 }
  ];
  totalContributors: number = 320;
  newContributors: number = 20;

  selectedTimeRange: string = 'Select Time Range'; // Default text
  dropdownOpen: boolean = false;
  timeRanges: string[] = ['Last 24 hours', 'Last Week', 'Last Month', 'Last 3 Months']; // Example options

  constructor() {}

  ngOnInit() {
    const userData = localStorage.getItem('user');
    if (userData) {
      this.user = JSON.parse(userData);
      console.log(this.user.firstName);
    }
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
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
          datasets: [{
            label: 'Funds Raised ($)',
            data: [1000, 3000, 5000, 7000, 10000, 12500],
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
