import { Routes } from '@angular/router';
import { HomePageComponent } from './views/home-page/home-page.component';
import { RolePickComponent } from './views/role-pick/role-pick.component';
export const routes: Routes = [
    {
        path: '',
        component: HomePageComponent,
       

    },{
        path: 'chooserole',
        component: RolePickComponent
    },
];
