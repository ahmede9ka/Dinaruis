import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard-investiseur',
  standalone:true,
  imports: [],
  templateUrl: './dashboard-investiseur.component.html',
  styleUrl: './dashboard-investiseur.component.css'
})
export class DashboardInvestiseurComponent {
  user:any
    constructor(){}
    ngOnInit(){
      const userData = localStorage.getItem("user");
      if (userData) {
        this.user = JSON.parse(userData);
        console.log(this.user.firstName);
      }
    }
}
