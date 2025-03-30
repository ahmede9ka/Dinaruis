import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { CampagneService } from '../../services/campagne.service';
import { InvestorService } from '../../services/investor.service';
import { UsersService } from '../../services/users.service';

interface Campaign{
  _id:string;
  title: string;
  description: string;
  amountGoal: number;
  image: string;
  images: string[];
  startDate: Date;
  endDate: Date;
  localisation: string;
  type: string;
  code_postal: string;
  user: string;
  progress?: number; // Added this
  isFavorite?: boolean; // Added this
  raisedAmount:number;
} 

@Component({
  selector: 'app-campagne',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [CommonModule],
  templateUrl: './campagne.component.html',
  styleUrls: ['./campagne.component.css']
})
export class CampagneComponent implements OnInit {
  campaignId: string | null = null;
  campaign!:Campaign;
  token:any;
  selectedAmount:number=0;
  data:any;
  user:any;
  constructor(private route: ActivatedRoute,
            private campaignService:CampagneService,
            private investorService:InvestorService,
            private userService:UsersService,
            private router:Router) {}

  ngOnInit(): void {
    const userData = localStorage.getItem('user');
    this.token = localStorage.getItem('token');
    
    if (userData) {
      this.user = JSON.parse(userData);
      this.route.paramMap.subscribe(params => {
        this.campaignId = params.get('id');
        console.log("aaa");
        console.log('Campaign ID:', this.campaignId);
      });
      this.campaignService.getCampaignById(this.campaignId,this.token).subscribe((data:any)=>{
        this.campaign = data.data;
      })
    }
    
    
  }
  selectAmount(amount:number){
    this.selectedAmount = amount;
    this.data = {
      "amount":this.selectedAmount,
      "campaign_id":this.campaignId
    }
  }
  donate(): void {
    if (!this.selectedAmount) {
      console.warn("Please select an amount before donating.");
      return;
    }
  
    this.userService.Donate(this.data, this.token).subscribe({
      next: (response: any) => {
        if (response.url) {
          // Redirect to Stripe Checkout
          window.location.href = response.url;
        } else {
          console.warn("Donation response does not contain a valid Stripe URL.");
        }
      },
      error: (error) => {
        console.error("Error processing donation:", error);
      }
    });
  }
  Equity(){
    const data = {
        "campaign_id":this.campaignId,
        "investmentType":"equity-based investment",
        "investor_id":this.user._id,
    }
    this.campaignService.sendMail(data,this.token).subscribe((data:any)=>{
      console.log(data);
    })
  }
  Loan(){
    const data = {
      "campaign_id":this.campaignId,
      "investmentType":"loan-based investment",
      "investor_id":this.user._id,
  }
  this.campaignService.sendMail(data,this.token).subscribe((data:any)=>{
    console.log(data);
  })
  }
  Reward(){
    const data = {
      "campaign_id":this.campaignId,
      "investmentType":"rewards-based investment",
      "investor_id":this.user._id,
  }
  this.campaignService.sendMail(data,this.token).subscribe((data:any)=>{
    console.log(data);
  })
  }
}
