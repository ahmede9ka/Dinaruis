import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../../model/class/User';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
@Component({
  selector: 'app-login-admin',
  standalone:true,
  imports: [FormsModule,CommonModule],
  templateUrl: './login-admin.component.html',
  styleUrl: './login-admin.component.css'
})
export class LoginAdminComponent {
  constructor(private router: Router,private loginservice:LoginService) {}

   userObj: User = new User();
   lostPassword(): void {
    this.router.navigate(['/lostpassword']);
  }
  login(): void {
    this.loginservice.Login(this.userObj).subscribe({
      next: (data: any) => {
        console.log("Login successful:", data);
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        this.router.navigate([`/admin/dashboard`]);
      },
      error: (err) => {
        console.error("Login failed:", err);
        alert("Login failed. Please check your credentials.");
      }
    });
  }

}
