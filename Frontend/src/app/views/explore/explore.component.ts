import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { TransactionService } from '../../services/transaction.service';
import { Campaign } from '../../model/class/Campaign';
import { CampagneService } from '../../services/campagne.service';

@Component({
  selector: 'app-explore',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './explore.component.html',
  styleUrl: './explore.component.css'
})
export class ExploreComponent implements OnInit {
  searchQuery: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 3;
  campaigns: Campaign[] = [];
  user: any;
  token: any;
  private _filteredCampaigns: Campaign[] = [];

  filters = {
    isFavorite: false,
    minProgress: 0,
    campaignType: 'all',
  };

  isModalOpen = false;

  constructor(private transactionservice: TransactionService,
              private campaignservice:CampagneService
  ) {}

  ngOnInit(): void {
    this.campaigns = []; // Ensure campaigns is initialized to prevent errors

    const userData = localStorage.getItem('user');
    this.token = localStorage.getItem('token');

    if (userData) {
      try {
        const user = JSON.parse(userData);
        if (user?._id) {
          this.fetchCampaigns(user._id);
        } else {
          console.error('User ID is missing in localStorage data');
        }
      } catch (error) {
        console.error('Error parsing user data from localStorage:', error);
      }
    } else {
      console.error('No user data found in localStorage');
    }
  }

  fetchCampaigns(id: any) {
    this.campaignservice.getCampaigns(this.token).subscribe((data: any) => {
      this.campaigns = data.data;
      console.log(this.campaigns)
    });
  }

  get totalPages(): number {
    return Math.ceil(this.filteredCampaigns().length / this.itemsPerPage);
  }

  paginatedCampaigns(): Campaign[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredCampaigns().slice(startIndex, endIndex);
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  openFilterModal() {
    this.isModalOpen = true;
  }

  closeFilterModal() {
    this.isModalOpen = false;
  }

  applyFilters() {
    this.isModalOpen = false;
    this.currentPage = 1;
  }

  filteredCampaigns(): Campaign[] {
    this._filteredCampaigns = this.campaigns.filter(campaign =>
      campaign.title.toLowerCase().includes(this.searchQuery.toLowerCase())
    );

    if (this.filters.isFavorite) {
      this._filteredCampaigns = this._filteredCampaigns.filter(campaign => campaign.isFavorite);
    }

   

    if (this.filters.campaignType !== 'all') {
      this._filteredCampaigns = this._filteredCampaigns.filter(campaign => campaign.type === this.filters.campaignType);
    }

    return this._filteredCampaigns;
  }

  getTypeClass(type: string): string {
    switch (type) {
      case 'Charity':
        return 'bg-green-500';
      case 'Business':
        return 'bg-yellow-500';
      case 'water':
        return 'bg-blue-500';
      case 'Environment':
        return 'bg-teal-500';
      default:
        return 'bg-gray-500'; // default type class if no match
    }
  }

  viewCampaignDetails(campaignId: number): void {
    console.log('Viewing details for campaign ID:', campaignId);
    // Add navigation or modal logic here
  }

  toggleFavorite(campaign: Campaign) {
    campaign.isFavorite = !campaign.isFavorite;
  }

  investInCampaign(id: any) {
    console.log(`Investing in campaign ID: ${id}`);
    // Add investment logic here
  }
}
