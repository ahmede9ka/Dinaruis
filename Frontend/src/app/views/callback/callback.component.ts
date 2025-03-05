import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.css']
})
export class CallbackComponent implements OnInit {
  user: any;
  token: string | null = null; // Initialize token

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    // Retrieve the user data and token from query parameters
    this.route.queryParams.subscribe(params => {
      const userString = params['user'];
      const tokenString = params['token'];

      if (userString) {
        try {
          this.user = JSON.parse(decodeURIComponent(userString));
          console.log("User data:", this.user);
        } catch (error) {
          console.error("Error parsing user data:", error);
          this.router.navigate(['/']); // Redirect if user data is invalid
          return;
        }
      } else {
        console.error("No user data found in query params.");
        this.router.navigate(['/']);
        return;
      }

      if (tokenString) {
        this.token = decodeURIComponent(tokenString);
        console.log("JWT Token:", this.token);

        // Store token and user data in localStorage
        localStorage.setItem('token', this.token);
        localStorage.setItem("user", JSON.stringify(this.user));

        if (this.user?.role) {
          console.log(`/${this.user.role.toLowerCase()}/dashboard`)
          this.router.navigate([`/${this.user.role.toLowerCase()}/dashboard`]);
          
        } else {
          console.error("User role not found, redirecting to home.");
          this.router.navigate(['/']);
        }
      } else {
        console.error("No token found in query params.");
        this.router.navigate(['/']);
      }
    });
  }
}
