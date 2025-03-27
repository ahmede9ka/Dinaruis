import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CampagneService } from '../../services/campagne.service';
import { Router } from '@angular/router';
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
  user:any;
  token:any;
  campaigns:any;
  get totalPages(): number {
    return Math.ceil(this.campaigns.length / this.itemsPerPage);
  }
  paginatedCampaigns() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.campaigns.slice(startIndex, endIndex);
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
  
 
  constructor(private campagneService:CampagneService,private router:Router) {}

  ngOnInit(): void {
    const userData = localStorage.getItem('user');
    this.token = localStorage.getItem('token');

    if (userData) {
      this.user = JSON.parse(userData);
      this.campagneService.getFavoriteByInvestorId(this.user._id,this.token).subscribe((data:any)=>{
        this.campaigns = data.data;
        console.log(data);
      })
    }
    
    
  }

  viewCampaignDetails(campaignId: number): void {
    console.log('Viewing details for campaign ID:', campaignId);
    // Logic to navigate to the campaign detail page or show modal
  }
  toggleFavorite(campaign: Campaign) {
    campaign.isFavorite = !campaign.isFavorite;
  }


  investInCampaign(id: any) {
    this.router.navigate([`/investor/explore/${id}`])
    // Add investment logic here
  }
}
