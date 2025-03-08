import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DashboardNavComponent } from "../dashboard-nav/dashboard-nav.component";
import { SidebarDashboardComponent } from "../sidebar-dashboard/sidebar-dashboard.component";
import { UserManagementComponent } from "../user-management/user-management.component";
import { TransactionsManagementComponent } from "../transactions-management/transactions-management.component";
import { CampagnesManagementComponent } from "../campagnes-management/campagnes-management.component";
import { AdminSettingsComponent } from "../admin-settings/admin-settings.component";
import { MyProjectsComponent } from "../my-projects/my-projects.component";
import { FundingRequestsComponent } from "../funding-requests/funding-requests.component";
import { EntrepreneurSettingsComponent } from "../entrepreneur-settings/entrepreneur-settings.component";
import { ExploreComponent } from "../explore/explore.component";
import { MyInvestementComponent } from "../my-investement/my-investement.component";
import { MyFavoritesComponent } from "../my-favorites/my-favorites.component";
import { DashboardAdminComponent } from "../dashboard-admin/dashboard-admin.component";
import { DashboardInvestiseurComponent } from "../dashboard-investiseur/dashboard-investiseur.component";
import { DashboardEnterpreneurComponent } from "../dashboard-enterpreneur/dashboard-enterpreneur.component";
import { InvestorSettingsComponent } from "../investor-settings/investor-settings.component";

@Component({
  selector: 'app-role-dashboard',
  template: `
    <app-dashboard-nav></app-dashboard-nav>
    <app-sidebar-dashboard></app-sidebar-dashboard>

    <div class="pt-4 sm:ml-64">
  
    <div class="    mt-14" >
      <!-- Conditional rendering based on the role -->
      <ng-container *ngIf="isValidRole">
        <ng-container *ngIf="role === 'admin'">
          <ng-container *ngIf="isValidPage">
            <ng-container *ngIf="page === 'dashboard'">
              <app-dashboard-admin></app-dashboard-admin>
            </ng-container>
            <ng-container *ngIf="page === 'userManagement'">
              <app-user-management></app-user-management>
            </ng-container>
            <ng-container *ngIf="page === 'transactionsManagement'">
              <app-transactions-management></app-transactions-management>
            </ng-container>
            <ng-container *ngIf="page === 'campagnesManagement'">
              <app-campagnes-management></app-campagnes-management>
            </ng-container>
            <ng-container *ngIf="page === 'settings'">
              <app-admin-settings></app-admin-settings>
            </ng-container>
          </ng-container>
          <ng-template #invalidPage>
            <p>Invalid page for admin</p>
          </ng-template>
        </ng-container>

        <ng-container *ngIf="role === 'entrepreneur'">
          <ng-container *ngIf="isValidPage">
            <ng-container *ngIf="page === 'dashboard'">
              <app-dashboard-enterpreneur></app-dashboard-enterpreneur>
            </ng-container>
            <ng-container *ngIf="page === 'myProjects'">
              <app-my-projects></app-my-projects>
            </ng-container>
            <ng-container *ngIf="page === 'fundingRequests'">
              <app-funding-requests></app-funding-requests>
            </ng-container>
            <ng-container *ngIf="page === 'settings'">
              <app-entrepreneur-settings></app-entrepreneur-settings>
            </ng-container>
          </ng-container>
          <ng-template #invalidPageForEntrepreneur>
            <p>Invalid page for entrepreneur</p>
          </ng-template>
        </ng-container>

        <ng-container *ngIf="role === 'investor'">
          <ng-container *ngIf="isValidPage">
            <ng-container *ngIf="page === 'dashboard'">
              <app-dashboard-investiseur></app-dashboard-investiseur>
            </ng-container>
            <ng-container *ngIf="page === 'explore'">
              <app-explore></app-explore>
            </ng-container>
            <ng-container *ngIf="page === 'investments'">
              <app-my-investement></app-my-investement>
            </ng-container>
            <ng-container *ngIf="page === 'favorites'">
              <app-my-favorites></app-my-favorites>
            </ng-container>
            <ng-container *ngIf="page === 'settings'">
              <app-investor-settings></app-investor-settings>
            </ng-container>
          </ng-container>
          <ng-template #invalidPageForInvestor>
            <p>Invalid page for investor</p>
          </ng-template>
        </ng-container>

      </ng-container>

      <!-- Fallback message if role is invalid -->
      <ng-container *ngIf="!isValidRole">
        <p class="text-black">Invalid role</p>
      </ng-container>

      <!-- Fallback message if page is invalid -->
      <ng-container *ngIf="!isValidPage">
        <p class="text-black">Invalid page</p>
      </ng-container>

    </div>
    </div>
    

  `,
  standalone:true,
  imports: [
    CommonModule,
    DashboardAdminComponent,
    DashboardInvestiseurComponent,
    DashboardEnterpreneurComponent,
    DashboardNavComponent,
    SidebarDashboardComponent,
    UserManagementComponent,
    TransactionsManagementComponent,
    CampagnesManagementComponent,
    AdminSettingsComponent,
    MyProjectsComponent,
    FundingRequestsComponent,
    EntrepreneurSettingsComponent,
    ExploreComponent,
    MyInvestementComponent,
    MyFavoritesComponent,
    InvestorSettingsComponent
]
})
export class RoleDashboardComponentComponent {
  role: string | null = null;
  page: string | null = null;
  isValidRole: boolean = false;
  isValidPage: boolean = false;

  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.role = params['role'];
      this.page = params['page'];
      this.isValidRole = ['admin', 'entrepreneur', 'investor'].includes(this.role || '');
      this.isValidPage = this.isValidRole && this.page !== null && this.isValidPageForRole(this.role!, this.page);
    });
  }

  private isValidPageForRole(role: string, page: string): boolean {
    const validPagesForAdmin = ['dashboard', 'userManagement', 'transactionsManagement', 'campagnesManagement', 'settings'];
    const validPagesForEntrepreneur = ['dashboard', 'myProjects', 'fundingRequests', 'settings'];
    const validPagesForInvestor = ['dashboard', 'explore', 'investments', 'favorites','settings'];

    if (role === 'admin') {
      return validPagesForAdmin.includes(page);
    } else if (role === 'entrepreneur') {
      return validPagesForEntrepreneur.includes(page);
    } else if (role === 'investor') {
      return validPagesForInvestor.includes(page);
    }
    return false;
  }
}
