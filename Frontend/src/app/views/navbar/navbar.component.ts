import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-navbar',
  standalone:true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{
  constructor(private router:Router) {}
  dropdownOpen: boolean = false;
  signup(){
     this.router.navigate(['/chooserole']);
  }
  user: any = null;



  ngOnInit(): void {
    this.loadUser();
    
  }

  loadUser(): void {
    const userData = localStorage.getItem("user");
    if (userData) {
      this.user = JSON.parse(userData);
    }
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem("token");
  }
  toggleDropdown(): void {
    this.dropdownOpen = !this.dropdownOpen;
  }
  

  goToDashboard(): void {
    const userData = localStorage.getItem("user");
    if (userData) {
      const user = JSON.parse(userData);
      const role = user.role.toLowerCase();
      this.router.navigate([`/${role}/dashboard`]);
    }
  }
  logout(): void {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    this.router.navigate(['/login']);
    this.dropdownOpen = false;
  }

  

  goToProfile(): void {
    this.router.navigate(['/:role/f']);
  }
}
