import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
interface Donation {
  name: string;
  amount: number;
  type: string;
  avatar: string;
}
@Component({
  selector: 'app-campagne',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports:
  [CommonModule],
  templateUrl: './campagne.component.html',
  styleUrl: './campagne.component.css'
})

export class CampagneComponent {
  campaignTitle: string = 'Help Deonte Scott Get a Wheelchair Van';
  amountRaised: number = 5000;
  targetAmount: number = 10000;
  totalDonations: number = 120;
  campaignImage: string =
    'https://images.unsplash.com/photo-1556740737-768f5f9f9e2b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60';
  campaignDescription: string = "Deonte Scott";
  campaignCreator: string = 'Deonte Scott';
  organizerName: string = 'Deonte Scott';
  beneficiaryName: string = 'Deonte Scott';

  progress: number = (this.amountRaised / this.targetAmount) * 100;

  recentDonorsCount: number = 10;
  recentDonations = [
    { name: 'Alice Johnson', amount: 50, type: 'Top Donor', avatar: 'https://randomuser.me/api/portraits/women/1.jpg' },
    { name: 'Michael Smith', amount: 30, type: 'Recent Donor', avatar: 'https://randomuser.me/api/portraits/men/1.jpg' },
    { name: 'Sarah Williams', amount: 20, type: 'Supporter', avatar: 'https://randomuser.me/api/portraits/women/2.jpg' }
  ];

  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'CHF' }).format(amount);
  }

  navigateTo(url: string): void {
    window.location.href = url;
  }
}
