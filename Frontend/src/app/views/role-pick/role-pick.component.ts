import { Component } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { CommonModule } from '@angular/common';
import { NgZone } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-role-pick',
  standalone:true,
  imports: [CardComponent,CommonModule],
  templateUrl: './role-pick.component.html',
  styleUrl: './role-pick.component.css',
  
})
export class RolePickComponent {
  title = 'Choose Your Role';
  constructor(private ngZone: NgZone,private router:Router) {}
  // Define card data for roles
  roles = [
    {
      title: 'INVESTOR',
      description: 'Explore investment opportunities and grow your portfolio.',
      iconPath: 'M18 5h-.7c.229-.467.349-.98.351-1.5a3.5 3.5 0 0 0-3.5-3.5c-1.717 0-3.215 1.2-4.331 2.481C8.4.842 6.949 0 5.5 0A3.5 3.5 0 0 0 2 3.5c.003.52.123 1.033.351 1.5H2a2 2 0 0 0-2 2v3a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V7a2 2 0 0 0-2-2ZM8.058 5H5.5a1.5 1.5 0 0 1 0-3c.9 0 2 .754 3.092 2.122-.219.337-.392.635-.534.878Zm6.1 0h-3.742c.933-1.368 2.371-3 3.739-3a1.5 1.5 0 0 1 0 3h.003ZM11 13H9v7h2v-7Zm-4 0H2v5a2 2 0 0 0 2 2h3v-7Zm6 0v7h3a2 2 0 0 0 2-2v-5h-5Z'
    },
    {
      title: 'ENTREPRENEUR',
      description: 'Start and manage your own business with innovative ideas.',
      iconPath: 'M4 2C2.34 2 1 3.34 1 5v10c0 1.66 1.34 3 3 3h10c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3H4zm0 2h10c.55 0 1 .45 1 1s-.45 1-1 1H4c-.55 0-1-.45-1-1s.45-1 1-1zm0 4h10c.55 0 1 .45 1 1s-.45 1-1 1H4c-.55 0-1-.45-1-1s.45-1 1-1zm0 4h10c.55 0 1 .45 1 1s-.45 1-1 1H4c-.55 0-1-.45-1-1s.45-1 1-1z'
    }
  ];
  selectedRole: any; // To hold the selected role

  selectRole(role: any) {
    this.selectedRole = role; // Set the selected role
    console.log('Selected Role:', role); // For debugging or further logic
  }

  next() {
    console.log(this.selectedRole);
    if (this.selectedRole) {
        if(this.selectedRole.title=="INVESTOR"){
            this.router.navigate(['/login/INVESTOR']);
        }else{
          this.router.navigate(['/login/ENTREPRENEUR'])
        }
    } else {
        this.ngZone.run(() => {
            alert('Please select a role before proceeding.');
        });
    }
}

  
}
