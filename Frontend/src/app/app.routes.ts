import { Routes } from '@angular/router';
import { HomePageComponent } from './views/home-page/home-page.component';
import { RolePickComponent } from './views/role-pick/role-pick.component';
import { LoginComponent } from './views/login/login.component';
import { LostPasswordComponent } from './views/lost-password/lost-password.component';
import { SignUpComponent } from './views/sign-up/sign-up.component';
import { CallbackComponent } from './views/callback/callback.component';
import { DashboardAdminComponent } from './views/dashboard-admin/dashboard-admin.component';

export const routes: Routes = [
  {
    path: '',
    component: HomePageComponent, // Default route (home page)
  },
  {
    path: 'chooserole',
    component: RolePickComponent, // Route for role selection
  },
  {
    path: 'login/:role', // Dynamic route for login with role parameter
    component: LoginComponent,
  },
  {
    path: 'da',
    component: DashboardAdminComponent, // Route for OAuth callback
  },
  {
    path: 'lostpassword',
    component: LostPasswordComponent, // Route for lost password page
  },
  {
    path: 'signup',
    component: SignUpComponent, // Route for signup page
  },
  {
    path: 'callback',
    component: CallbackComponent, // Route for OAuth callback
  },
  {
    path: '**', // Wildcard route for 404 page (optional)
    redirectTo: '', // Redirect to home page or a dedicated 404 page
  },
  
];