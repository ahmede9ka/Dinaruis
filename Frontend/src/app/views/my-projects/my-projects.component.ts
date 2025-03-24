import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CampagneService } from '../../services/campagne.service';

interface Campaign {
  _id:string;
  title: string;
  description: string;
  amountGoal: number;
  image: string;
  images: string[];
  startDate: Date;
  endDate: Date;
  localisation: string;
  type: string;
  code_postal: string;
  user: string;
  progress: number; // Added this
  isFavorite: boolean; // Added this
  raisedAmount:number;
}

@Component({
  selector: 'app-my-projects',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './my-projects.component.html',
  styleUrls: ['./my-projects.component.css'], // Corrected to use an array
})
export class MyProjectsComponent implements OnInit {
  searchQuery: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 3; // Number of items per page
  campaigns: Campaign[] = []; // Initialize campaigns properly
  token:any;
  constructor(private campaignService: CampagneService) {}

  ngOnInit(): void {
    const userData = localStorage.getItem('user');
    this.token = localStorage.getItem('token');
    if (userData) {
      try {
        const user = JSON.parse(userData); // Properly parse JSON string
        console.log(user._id);
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
  get totalPages(): number {
    return Math.ceil(this.filteredCampaigns().length / this.itemsPerPage);
  }

  paginatedCampaigns() {
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

  filters = {
    isFavorite: false,
    minProgress: 0,
    campaignType: 'all',
  };

  isModalOpen = false;

  // Open the filter modal
  openFilterModal() {
    this.isModalOpen = true;
  }

  // Close the filter modal
  closeFilterModal() {
    this.isModalOpen = false;
  }

  // Apply selected filters
  applyFilters() {
    this.isModalOpen = false;
    this.currentPage = 1;
  }

  // Filter campaigns based on search and selected filters
  filteredCampaigns(): Campaign[] {
    let filtered = this.campaigns.filter((campaign) =>
      campaign.title.toLowerCase().includes(this.searchQuery.toLowerCase())
    );

    if (this.filters.minProgress > 0) {
      filtered = filtered.filter((campaign) => campaign.progress >= this.filters.minProgress);
    }

    if (this.filters.campaignType !== 'all') {
      filtered = filtered.filter((campaign) => campaign.type === this.filters.campaignType);
    }

    return filtered;
  }

  getTypeClass(type: string) {
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

  

  fetchCampaigns(userId: number) {
    this.campaignService.getCampaignsByEntrepreneur(userId,this.token).subscribe(
      (response: any) => {
        if (response?.data) {
          this.campaigns = response.data;
          console.log("campaigns:",this.campaigns);
        } else {
          console.error('Invalid API response format:', response);
        }
      },
      (error) => {
        console.error('Error fetching campaigns:', error);
      }
    );
  }

  viewCampaignDetails(campaignId: string): void {
    console.log('Viewing details for campaign ID:', campaignId);
    // Logic to navigate to the campaign detail page or show modal
  }

  toggleFavorite(campaign: Campaign) {
    campaign.isFavorite = !campaign.isFavorite;
  }

  investInCampaign(id: string) {
    console.log(`Investing in campaign ID: ${id}`);
    // Add logic to process investments
  }
}
