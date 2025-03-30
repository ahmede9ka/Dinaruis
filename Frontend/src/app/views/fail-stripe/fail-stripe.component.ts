import { Component, Input } from '@angular/core';
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
  @Input() errorCode = "ERR-9876"
  @Input() amount = "$125.00"
  @Input() date = "March 30, 2025"
  @Input() reason = "Your card was declined by the issuing bank."
  ngOnInit(){

  }
  goto(){
    this.router.navigate(['/']);
  }
}
