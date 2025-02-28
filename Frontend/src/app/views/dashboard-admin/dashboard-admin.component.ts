import { Component,OnInit  } from '@angular/core';


import { Chart } from 'chart.js';
import ApexCharts from 'apexcharts';
@Component({
  selector: 'app-dashboard-admin',
  standalone: true,
  imports: [],
  templateUrl: './dashboard-admin.component.html',
  styleUrl: './dashboard-admin.component.css'
})
export class DashboardAdminComponent implements OnInit {
  ngOnInit(): void {
    // Area Chart
    const ctxArea = document.getElementById("area-chart") as HTMLCanvasElement | null;
    if (ctxArea) {
      const context = ctxArea.getContext("2d");
      if (context) {
        new Chart(context, {
          type: "line",  // Can change to 'bar', 'radar', etc.
          data: {
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
            datasets: [{
              label: "Sales Over Time",
              data: [1200, 1500, 1100, 1800, 1600, 2000],
              borderColor: "#4CAF50",
              backgroundColor: "rgba(76, 175, 80, 0.2)",
              fill: true
            }]
          }
        });
      }
    }
  }
}