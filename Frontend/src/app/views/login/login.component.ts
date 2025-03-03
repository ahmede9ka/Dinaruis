import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GoogleserviceService } from '../../services/googleservice.service';
import { LoginService } from '../../services/login.service';
import { User } from '../../model/class/User';
import { CommonModule, LowerCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'] // Fixed styleUrls
})
export class LoginComponent implements OnInit {
  role: string | null = '';
  userObj: User = new User();

  constructor(
    private router: Router,
    private googleservice: GoogleserviceService,
    private route: ActivatedRoute,
    private loginservice: LoginService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.role = params.get('role'); // Get the role from URL
      console.log('Role from URL:', this.role); // Debugging output
    });
  }

  lostPassword(): void {
    this.router.navigate(['/lostpassword']);
  }

  signUp(): void {
    if (this.role === "INVESTOR") {
      this.router.navigate(['/signup/INVESTOR']);
    } else {
      this.router.navigate(['/signup/ENTREPRENEUR']);
    }
  }

  login(): void {
    this.loginservice.Login(this.userObj).subscribe({
      next: (data: any) => {
        console.log("Login successful:", data);
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user)); // Fixed localStorage issue
        const lowerRole = this.role?.toLowerCase();
        this.router.navigate([`/${lowerRole}/dashboard`]);
      },
      error: (err) => {
        console.error("Login failed:", err);
        alert("Login failed. Please check your credentials.");
      }
    });
  }

  ConnectWithGoogle(): void {
    console.log('Connecting with Google, Role:', this.role);
    this.googleservice.Login(this.role);
  }
}
