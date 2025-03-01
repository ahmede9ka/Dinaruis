import { Routes } from '@angular/router';
import { HomePageComponent } from './views/home-page/home-page.component';
import { RolePickComponent } from './views/role-pick/role-pick.component';
import { LoginComponent } from './views/login/login.component';
import { LostPasswordComponent } from './views/lost-password/lost-password.component';
import { SignUpComponent } from './views/sign-up/sign-up.component';
import { CallbackComponent } from './views/callback/callback.component';

import { RoleDashboardComponent } from './views/role-dashboard-component/role-dashboard-component.component';


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
    path: ':role/:page/:id',
    component: RoleDashboardComponent, // A wrapper component to determine which dashboard to display
  },
  {
    path: 'lostpassword',
    component: LostPasswordComponent, // Route for lost password page
  },
  {
    path: 'signup/:role',
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