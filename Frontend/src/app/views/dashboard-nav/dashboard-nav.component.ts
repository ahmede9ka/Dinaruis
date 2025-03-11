import { CommonModule } from '@angular/common';
import { Component, ElementRef, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-nav',
  standalone:true,
  imports: [CommonModule],
  templateUrl: './dashboard-nav.component.html',
  styleUrl: './dashboard-nav.component.css'
})
export class DashboardNavComponent {
  constructor(private renderer: Renderer2, private el: ElementRef, private router:Router) {}
  
  logout(): void {
   
        console.log("Logout successful");
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        this.router.navigate(['/']);
   
  }
 
  user:any;
  ngOnInit() {
    const userData = localStorage.getItem('user');
    if (userData) {
      this.user = JSON.parse(userData);
      console.log(this.user.role);
    };
    const userMenuButton = this.el.nativeElement.querySelector("[data-dropdown-toggle='dropdown-user']");
    const dropdownMenu = this.el.nativeElement.querySelector("#dropdown-user");

    if (userMenuButton && dropdownMenu) {
      this.renderer.listen(userMenuButton, 'click', () => {
        dropdownMenu.classList.toggle("hidden");
      });

      // Close the dropdown when clicking outside
      this.renderer.listen('document', 'click', (event: Event) => {
        if (!userMenuButton.contains(event.target as Node) && !dropdownMenu.contains(event.target as Node)) {
          dropdownMenu.classList.add("hidden");
        }
      });
    }
  }
  startCampagne(): void {
    this.router.navigate(['/entrepreneur/start-campagne/step1']);
  }
}
