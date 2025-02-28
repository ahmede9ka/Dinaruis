import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-sidebar-dashboard',
  imports: [CommonModule,RouterModule],
  templateUrl: './sidebar-dashboard.component.html',
  styleUrl: './sidebar-dashboard.component.css'
})
export class SidebarDashboardComponent implements OnInit {
  

    userRole: string = ''; // Assume this comes from authentication service
    menuItems: any[] = [];
  
    adminMenu = [
      { name: 'Dashboard', path: '/admin/dashboard', icon: 'bi bi-speedometer2' },
      { name: 'Users', path: '/admin/users', icon: 'bi bi-people' },
      { name: 'Reports', path: '/admin/reports', icon: 'bi bi-bar-chart' },
      { name: 'Settings', path: '/admin/settings', icon: 'bi bi-gear' }
    ];
  
    entrepreneurMenu = [
      { name: 'Dashboard', path: '/entrepreneur/dashboard', icon: 'bi bi-speedometer2' },
      { name: 'My Projects', path: '/entrepreneur/projects', icon: 'bi bi-lightbulb' },
      { name: 'Funding Requests', path: '/entrepreneur/funding', icon: 'bi bi-cash' },
      { name: 'Settings', path: '/entrepreneur/settings', icon: 'bi bi-gear' }
    ];
  
    investorMenu = [
      { name: 'Dashboard', path: '/investor/dashboard', icon: 'bi bi-speedometer2' },
      { name: 'Investment Opportunities', path: '/investor/opportunities', icon: 'bi bi-briefcase' },
      { name: 'My Investments', path: '/investor/investments', icon: 'bi bi-wallet2' },
      { name: 'Settings', path: '/investor/settings', icon: 'bi bi-gear' }
    ];
    constructor(private authService: AuthService) {}
    ngOnInit() {
      // Assume you fetch user role from a service
      //this.userRole = this.authService.getUserRole(); 
      this.userRole = 'admin'; // Change this dynamically based on logged-in user
  
      // Assign the correct menu based on role
      switch (this.userRole) {
        case 'admin':
          this.menuItems = this.adminMenu;
          break;
        case 'entrepreneur':
          this.menuItems = this.entrepreneurMenu;
          break;
        case 'investor':
          this.menuItems = this.investorMenu;
          break;
        default:
          this.menuItems = [];
          break;
      }
    }
  }
  
  

