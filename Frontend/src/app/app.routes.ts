import { Routes } from '@angular/router';
import { HomePageComponent } from './views/home-page/home-page.component';
import { RolePickComponent } from './views/role-pick/role-pick.component';
import { LoginComponent } from './views/login/login.component';
import { LostPasswordComponent } from './views/lost-password/lost-password.component';
import { SignUpComponent } from './views/sign-up/sign-up.component';
import { CallbackComponent } from './views/callback/callback.component';

import { RoleDashboardComponentComponent } from './views/role-dashboard-component/role-dashboard-component.component';
import { StartCampagneComponent } from './views/start-campagne/start-campagne.component';
import { StartCampagneStep2Component } from './views/start-campagne-step2/start-campagne-step2.component';
import { StartCampagneStep3Component } from './views/start-campagne-step3/start-campagne-step3.component';
import { StartCampagneStep4Component } from './views/start-campagne-step4/start-campagne-step4.component';
import { CampagneComponent } from './views/campagne/campagne.component';


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
    path: 'a',
    component: StartCampagneComponent, // Route for role selection
  },
  {
    path: 'b',
    component: StartCampagneStep2Component, // Route for role selection
  },
  {
    path: 'c',
    component: StartCampagneStep3Component, // Route for role selection
  },
  {
    path: 'd',
    component: StartCampagneStep4Component, // Route for role selection
  },
  {
    path: 'f',
    component: CampagneComponent, // Route for role selection
  },
  {
    path: 'login/:role', // Dynamic route for login with role parameter
    component: LoginComponent,
  },
  {
    path: ':role/:page',
    component: RoleDashboardComponentComponent, // A wrapper component to determine which dashboard to display
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