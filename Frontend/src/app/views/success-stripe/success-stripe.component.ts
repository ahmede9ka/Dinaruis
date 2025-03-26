import { Component, OnInit } from '@angular/core';
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
  ngOnInit(){

  }
  goto(){
    this.router.navigate(['/']);
  }
}
