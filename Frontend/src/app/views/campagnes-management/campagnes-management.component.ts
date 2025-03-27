import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { CampagneService } from '../../services/campagne.service';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Eye, Edit, CheckSquare, Archive, Trash } from 'lucide-angular';

@Component({
  selector: 'app-campagnes-management',
  standalone: true,
  imports: [CommonModule,LucideAngularModule], // HttpClientModule is not needed here
  templateUrl: './campagnes-management.component.html',
  
  styleUrls: ['./campagnes-management.component.css']
})
export class CampagnesManagementComponent implements OnInit {
  token: string | null = null;
  icons = {
    Eye,Edit,CheckSquare,Archive,Trash
  };
  allElements: any[] = []; // This will hold the full data for all campaigns
  paginatedElementsArray: any[] = []; // This will hold the elements for the current page
  
  // Pagination properties
  currentPage: number = 1;
  itemsPerPage: number = 3;

  constructor(private campagneService: CampagneService) {}

  ngOnInit() {
    this.token = localStorage.getItem('token');
    if (this.token) {
      this.fetchCampagnes(); // Fetch campaigns on initialization
    } else {
      console.error('No token found in localStorage');
    }
  }

  fetchCampagnes() {
    if (this.token) {
      this.campagneService.getCampaigns(this.token).subscribe(
        (data: any) => {
          // Store all elements
          this.allElements = data?.data || [];
          console.log(this.allElements);
          this.updatePaginatedElements();
        },
        (error) => console.error('Error fetching campaigns:', error)
      );
    }
  }

  // Pagination methods
  get totalPages(): number {
    return Math.ceil(this.allElements.length / this.itemsPerPage);
  }

  updatePaginatedElements() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedElementsArray = this.allElements.slice(startIndex, endIndex);
  }

  paginatedElements(): any[] {
    return this.paginatedElementsArray;
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedElements(); // Update elements when page changes
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedElements(); // Update elements when page changes
    }
  }
}
