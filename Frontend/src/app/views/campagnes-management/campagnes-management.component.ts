import { Component, OnInit } from '@angular/core';
import { CampagneService } from '../../services/campagne.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-campagnes-management',
  standalone: true,
  imports: [CommonModule, HttpClientModule], // Include HttpClientModule
  templateUrl: './campagnes-management.component.html',
  styleUrl: './campagnes-management.component.css'
})
export class CampagnesManagementComponent implements OnInit {
  token: string | null = null;
  elements: any[] = [];

  constructor(private campagneService: CampagneService) {}

  ngOnInit() {
    this.token = localStorage.getItem('token');
    
    if (this.token) {
      this.campagneService.getCampaigns(this.token).subscribe(
        (data: any) => {
          this.elements = data?.data || []; // Ensure data exists
          console.log(this.elements);

          if (this.elements.length > 0) {
            this.elements.forEach((campaign) => {
              this.campagneService.getDonationByCampaign(campaign._id).subscribe(
                (donationData: any) => {
                  console.log(donationData);
                },
                (error) => console.error('Error fetching donations:', error)
              );
            });
          }
        },
        (error) => console.error('Error fetching campaigns:', error)
      );
    } else {
      console.error('No token found in localStorage');
    }
  }
}
