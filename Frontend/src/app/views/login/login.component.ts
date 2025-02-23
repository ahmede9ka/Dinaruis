import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private router:Router) {}
  lostPassword(){
    this.router.navigate(['/lostpassword']);
  }
  signUp(){
    this.router.navigate(['/signup']);
  }

}
