import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.css']
})
export class CallbackComponent implements OnInit {
  user: any;
  token: string | null;

  constructor(private route: ActivatedRoute) {
    this.token = null; // Initialize token
  }

  ngOnInit() {
    // Retrieve the user data and token from query parameters
    this.route.queryParams.subscribe(params => {
      const userString = params['user'];
      const tokenString = params['token'];
      
      if (userString) {
        this.user = JSON.parse(decodeURIComponent(userString));
        console.log("User data:", this.user);
      } else {
        console.error("No user data found in query params.");
      }

      if (tokenString) {
        this.token = decodeURIComponent(tokenString);
        console.log("JWT Token:", this.token);
        
        // Optionally, store the token in localStorage if needed
        localStorage.setItem('jwt', this.token);
      } else {
        console.error("No token found in query params.");
      }
    });
  }
}
