import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GoogleserviceService } from '../../services/googleservice.service';
@Component({
  selector: 'app-login',
  standalone:true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  role: string | null = '';
  constructor(private router:Router,private googleservice:GoogleserviceService,private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.role = params.get('role'); // Get the role from URL
      console.log('Role from URL:', this.role); // Debugging output
    });
  }
  lostPassword(){
    this.router.navigate(['/lostpassword']);
  }
  signUp(){
    this.router.navigate(['/signup']);
  }
  ConnectWithGoogle() {
    this.googleservice.Login(this.role); // Call the login method from the service
    //this.router.navigate(['/callback']);
  }
}
