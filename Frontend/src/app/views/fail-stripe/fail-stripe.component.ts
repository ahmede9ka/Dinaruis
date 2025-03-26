import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fail-stripe',
  standalone:true,
  imports: [],
  templateUrl: './fail-stripe.component.html',
  styleUrl: './fail-stripe.component.css'
})
export class FailStripeComponent {
  constructor(private router:Router){}
  ngOnInit(){

  }
  goto(){
    this.router.navigate(['/']);
  }
}
