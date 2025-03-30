import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-success-stripe',
  standalone:true,
  imports: [],
  templateUrl: './success-stripe.component.html',
  styleUrl: './success-stripe.component.css'
})
export class SuccessStripeComponent implements OnInit{
  constructor(private router:Router){}
  @Input() orderNumber = "ORD-12345678"
  @Input() amount = "$125.00"
  @Input() date = "March 30, 2025"
  @Input() email = "user@example.com"
  ngOnInit(){

  }
  goto(){
    this.router.navigate(['/']);
  }
}
