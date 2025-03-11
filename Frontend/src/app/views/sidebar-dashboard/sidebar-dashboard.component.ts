import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sidebar-dashboard',
  standalone:true,
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
    { name: 'Dashboard', path: '/admin/dashboard', icon: 'bi bi-speedometer2' },
    { name: 'Campagnes Management', path: '/admin/campagnesManagement', icon: 'bi bi-megaphone' }, // Fixed typo & updated icon
    { name: 'User Management', path: '/admin/userManagement', icon: 'bi bi-people' }, // Fixed path
    { name: 'Transaction Management', path: '/admin/transactionsManagement', icon: 'bi bi-cash-stack' }, // Fixed path & updated icon
    { name: 'Settings et Configuration', path: '/admin/settings', icon: 'bi bi-gear' } // Fixed spelling to French
  ];

  entrepreneurMenu = [
    { name: 'Dashboard', path: '/entrepreneur/dashboard', icon: 'bi bi-speedometer2' },
    { name: 'My Projects', path: '/entrepreneur/myProjects', icon: 'bi bi-lightbulb' },
    { name: 'Funding Requests', path: '/entrepreneur/fundingRequests', icon: 'bi bi-cash' },
    { name: 'Settings', path: '/entrepreneur/settings', icon: 'bi bi-gear' }
  ];

  investorMenu = [
    { name: 'Dashboard', path: '/investor/dashboard', icon: 'bi bi-speedometer2' },
    { name: 'Explore', path: '/investor/explore', icon: 'bi bi-briefcase' }, // Changed 'Explorer' to 'Explore' for consistency
    { name: 'My Investments', path: '/investor/investments', icon: 'bi bi-wallet2' },
    { name: 'My Favorites', path: '/investor/favorites', icon: 'bi bi-star' }, // Fixed path & updated icon for favorites
    { name: 'Settings & Configuration', path: '/investor/settings', icon: 'bi bi-gear' } // Fixed wording
  ];

  role: string | null = '';
  constructor(private router: Router, private route: ActivatedRoute, private authService: AuthService) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.role = params.get('role'); // Get the role from URL
      console.log('Role from URL:', this.role); // Debugging output
    });
    this.userRole = this.role ? this.role : '';
    console.log('User role:', this.userRole); // Debugging output
   
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
