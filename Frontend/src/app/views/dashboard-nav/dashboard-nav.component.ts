import { Component, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-dashboard-nav',
  imports: [],
  templateUrl: './dashboard-nav.component.html',
  styleUrl: './dashboard-nav.component.css'
})
export class DashboardNavComponent {
  constructor(private renderer: Renderer2, private el: ElementRef) {}

  ngOnInit() {
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
}
