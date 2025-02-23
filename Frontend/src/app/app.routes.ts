import { Routes } from '@angular/router';
import { HomePageComponent } from './views/home-page/home-page.component';
import { RolePickComponent } from './views/role-pick/role-pick.component';
import { LoginComponent } from './views/login/login.component';
import { LostPasswordComponent } from './views/lost-password/lost-password.component';
import { SignUpComponent } from './views/sign-up/sign-up.component';
export const routes: Routes = [
    {
        path: '',
        component: HomePageComponent,
        

    },{
        path: 'chooserole',
        component: RolePickComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'lostpassword',
        component: LostPasswordComponent
    },
    {
        path: 'signup',
        component: SignUpComponent
    },

];
