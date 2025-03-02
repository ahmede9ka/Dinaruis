import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sidebar-dashboard',
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar-dashboard.component.html',
  styleUrls: ['./sidebar-dashboard.component.css']  // Fixed typo here
})
export class SidebarDashboardComponent implements OnInit {
  userRole: string = ''; // Assume this comes from authentication service
  menuItems: any[] = [];

  // Define the constant ID here
  readonly constantID: string = '8'; // The ID is constant for now

  adminMenu = [
    { name: 'Dashboard', path: '/admin/dashboard/${this.constantID}', icon: 'bi bi-speedometer2' },
    { name: 'Campagnes Management', path: '/admin/campagnesManagement/${this.constantID}', icon: 'bi bi-megaphone' }, // Fixed typo & updated icon
    { name: 'User Management', path: '/admin/userManagement/${this.constantID}', icon: 'bi bi-people' }, // Fixed path
    { name: 'Transaction Management', path: '/admin/transactionsManagement/${this.constantID}', icon: 'bi bi-cash-stack' }, // Fixed path & updated icon
    { name: 'Settings et Configuration', path: '/admin/settings/${this.constantID}', icon: 'bi bi-gear' } // Fixed spelling to French
  ];

  entrepreneurMenu = [
    { name: 'Dashboard', path: '/entrepreneur/dashboard/${this.constantID}', icon: 'bi bi-speedometer2' },
    { name: 'My Projects', path: '/entrepreneur/myProjects/${this.constantID}', icon: 'bi bi-lightbulb' },
    { name: 'Funding Requests', path: '/entrepreneur/fundingRequests/${this.constantID}', icon: 'bi bi-cash' },
    { name: 'Settings', path: '/entrepreneur/settings/${this.constantID}', icon: 'bi bi-gear' }
  ];

  investorMenu = [
    { name: 'Dashboard', path: '/investor/dashboard/${this.constantID}', icon: 'bi bi-speedometer2' },
    { name: 'Explore', path: '/investor/explore/${this.constantID}', icon: 'bi bi-briefcase' }, // Changed 'Explorer' to 'Explore' for consistency
    { name: 'My Investments', path: '/investor/investments/${this.constantID}', icon: 'bi bi-wallet2' },
    { name: 'My Favorites', path: '/investor/favorites/${this.constantID}', icon: 'bi bi-star' }, // Fixed path & updated icon for favorites
    { name: 'Settings & Configuration', path: '/investor/settings/${this.constantID}', icon: 'bi bi-gear' } // Fixed wording
  ];

  role: string | null = '';
  constructor(private router: Router, private route: ActivatedRoute, private authService: AuthService) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.role = params.get('role'); // Get the role from URL
      console.log('Role from URL:', this.role); // Debugging output
    });
    this.userRole = this.role ? this.role : '';
   
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

  navigateToPage(page: string) {
    if (this.userRole) {
      // Use the constant ID in the route
      this.router.navigate([`/${this.userRole}/${page}/${this.constantID}`]);
    }
  }
}
