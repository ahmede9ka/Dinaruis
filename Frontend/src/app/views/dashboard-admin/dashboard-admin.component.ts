import { Component } from '@angular/core';

import { DashboardNavComponent } from "../dashboard-nav/dashboard-nav.component";
import { SidebarDashboardComponent } from '../sidebar-dashboard/sidebar-dashboard.component';
@Component({
  selector: 'app-dashboard-admin',
  standalone: true,
  imports: [SidebarDashboardComponent, DashboardNavComponent],
  templateUrl: './dashboard-admin.component.html',
  styleUrl: './dashboard-admin.component.css'
})
export class DashboardAdminComponent {

}
