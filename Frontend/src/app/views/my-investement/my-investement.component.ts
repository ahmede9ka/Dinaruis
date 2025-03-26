import { Component, OnInit } from '@angular/core';
import { InvestorService } from '../../services/investor.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-my-investement',
  standalone:true,
  imports: [CommonModule],
  templateUrl: './my-investement.component.html',
  styleUrl: './my-investement.component.css'
})
export class MyInvestementComponent implements OnInit{
  token:any;
  investments:any;
  constructor(private investorservice:InvestorService){}
  ngOnInit(): void {
    const userData = localStorage.getItem('user');
    this.token = localStorage.getItem('token');

    if (userData) {
      try {
        const user = JSON.parse(userData);
        if (user?._id) {
          this.fetchInvestmentsById(user._id);
        } else {
          console.error('User ID is missing in localStorage data');
        }
      } catch (error) {
        console.error('Error parsing user data from localStorage:', error);
      }
    } else {
      console.error('No user data found in localStorage');
    }
  }
  fetchInvestmentsById(id:any){
    this.investorservice.getInvestmentById(id,this.token).subscribe((data:any)=>{
      this.investments = data.data;
      console.log(data);
    })
  }
}
