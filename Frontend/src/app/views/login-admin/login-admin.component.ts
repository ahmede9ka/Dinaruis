import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../../model/class/User';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login-admin',
  imports: [FormsModule,CommonModule],
  templateUrl: './login-admin.component.html',
  styleUrl: './login-admin.component.css'
})
export class LoginAdminComponent {
  constructor(private router: Router) {}

   userObj: User = new User();
   lostPassword(): void {
    this.router.navigate(['/lostpassword']);
  }
  login(): void {
    
    console.log("Login successful:", this.userObj);
  }

}
