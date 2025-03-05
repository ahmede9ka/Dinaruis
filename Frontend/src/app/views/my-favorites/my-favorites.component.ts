import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
interface Campaign {
  id: number;
  title: string;
  shortDescription: string;
  imageUrl: string;
  type:string;
  donatedAmount: number;
  goalAmount: number;
  progress: number;
  deadline: string;
  isFavorite: boolean;
}
@Component({
  selector: 'app-my-favorites',
  standalone:true,
  imports: [CommonModule,FormsModule],
  templateUrl: './my-favorites.component.html',
  styleUrl: './my-favorites.component.css'
})
export class MyFavoritesComponent implements OnInit {
  searchQuery: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 3; // Number of items per page
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
  filteredCampaigns() {
    let filtered = this.campaigns.filter(campaign =>
      campaign.title.toLowerCase().includes(this.searchQuery.toLowerCase())
    );

   
    filtered = filtered.filter(campaign => campaign.isFavorite);
    

    if (this.filters.minProgress > 0) {
      filtered = filtered.filter(campaign => campaign.progress >= this.filters.minProgress);
    }

    if (this.filters.campaignType !== 'all') {
      filtered = filtered.filter(campaign => campaign.type === this.filters.campaignType);
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
  

  // Example campaigns array
  campaigns = [
    {
      id: 1,
      imageUrl: 'https://whygreeneconomy.org/wp-content/uploads/2013/03/Sustainable-Energy-For-All.jpg',
      title: 'Green Energy for All',
      shortDescription: 'A project to bring sustainable energy to rural areas.',
      progress: 75,
      donatedAmount: 15000,
      goalAmount: 20000,
      type:"Environment",
      deadline: '2025-12-31',
      isFavorite: false,
    },
    {
      id: 2,
      imageUrl: 'https://globalwellnessinstitute.org/wp-content/uploads/2019/11/WATERFeature-scaled.jpg',
      title: 'Clean Water Initiative',
      shortDescription: 'Providing clean water to communities in need.',
      progress: 50,
      donatedAmount: 10000,
      goalAmount: 20000,
      type:"water",
      deadline: '2025-11-30',
      isFavorite: false,
    },
    {
      id: 3,
      imageUrl: 'https://1.bp.blogspot.com/-5IPvRgjod-k/XAZp4gK5WlI/AAAAAAABRSM/TrFnLG97Kw4WKk8cNgBVqyvKqiWLqe5_ACEwYBhgL/s1600/Education%2Bmeeting%2Bgraphic.jpg',
      title: 'Education for All',
      shortDescription: 'Helping build schools and provide supplies for children.',
      progress: 25,
      donatedAmount: 5000,
      type:"Charity",
      goalAmount: 20000,
      deadline: '2025-10-31'
      ,
      isFavorite: true,
    },
    {
      id: 1,
      imageUrl: 'https://whygreeneconomy.org/wp-content/uploads/2013/03/Sustainable-Energy-For-All.jpg',
      title: 'Green Energy for All',
      shortDescription: 'A project to bring sustainable energy to rural areas.',
      progress: 75,
      donatedAmount: 15000,
      goalAmount: 20000,
      type:"water",
      deadline: '2025-12-31',
      isFavorite: false,
    },
    {
      id: 2,
      imageUrl: 'https://globalwellnessinstitute.org/wp-content/uploads/2019/11/WATERFeature-scaled.jpg',
      title: 'Clean Water Initiative',
      shortDescription: 'Providing clean water to communities in need.',
      progress: 50,
      donatedAmount: 10000,
      goalAmount: 20000,
      type:"water",
      deadline: '2025-11-30',
      isFavorite: false,
    },
    {
      id: 3,
      imageUrl: 'https://1.bp.blogspot.com/-5IPvRgjod-k/XAZp4gK5WlI/AAAAAAABRSM/TrFnLG97Kw4WKk8cNgBVqyvKqiWLqe5_ACEwYBhgL/s1600/Education%2Bmeeting%2Bgraphic.jpg',
      title: 'Education for All',
      shortDescription: 'Helping build schools and provide supplies for children.',
      progress: 25,
      donatedAmount: 5000,
      goalAmount: 20000,
      type:"Charity",
      deadline: '2025-10-31',
      isFavorite: false,
    }
  ];

  constructor() {}

  ngOnInit(): void {}

  viewCampaignDetails(campaignId: number): void {
    console.log('Viewing details for campaign ID:', campaignId);
    // Logic to navigate to the campaign detail page or show modal
  }
  toggleFavorite(campaign: Campaign) {
    campaign.isFavorite = !campaign.isFavorite;
  }


  investInCampaign(id: number) {
    console.log(`Investing in campaign ID: ${id}`);
    // Add logic to process investments
  }
}
