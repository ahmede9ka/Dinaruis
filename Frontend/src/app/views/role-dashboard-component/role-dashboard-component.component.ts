import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DashboardAdminComponent } from "../dashboard-admin/dashboard-admin.component";

import { DashboardInvestiseurComponent } from "../dashboard-investiseur/dashboard-investiseur.component";
import { DashboardEnterpreneurComponent } from "../dashboard-enterpreneur/dashboard-enterpreneur.component";
import { CommonModule } from '@angular/common';
import { DashboardNavComponent } from "../dashboard-nav/dashboard-nav.component";
import { SidebarDashboardComponent } from "../sidebar-dashboard/sidebar-dashboard.component";
@Component({
  selector: 'app-role-dashboard',
  
  template: `
  <app-dashboard-nav></app-dashboard-nav>
  <app-sidebar-dashboard></app-sidebar-dashboard>
    <ng-container *ngIf="role === 'admin'">
      <app-dashboard-admin></app-dashboard-admin>
    </ng-container>
    <ng-container *ngIf="role === 'entrepreneur'">
      <app-dashboard-enterpreneur></app-dashboard-enterpreneur>
    </ng-container>
    <ng-container *ngIf="role === 'investor'">
      <app-dashboard-investiseur></app-dashboard-investiseur>
    </ng-container>
    <p *ngIf="!isValidRole">Invalid role</p>
  `,
  imports: [CommonModule, DashboardAdminComponent, DashboardInvestiseurComponent, DashboardEnterpreneurComponent, DashboardNavComponent, SidebarDashboardComponent],
})
export class RoleDashboardComponent {
  role: string | null = null;
  isValidRole: boolean = false;

  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.role = params['role'];
      this.isValidRole = this.role !== null && ['admin', 'entrepreneur', 'investor'].includes(this.role)    });
  }
}
