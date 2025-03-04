import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-enterpreneur',
  standalone:true,
  imports: [],
  templateUrl: './dashboard-enterpreneur.component.html',
  styleUrl: './dashboard-enterpreneur.component.css'
})
export class DashboardEnterpreneurComponent implements OnInit{
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
