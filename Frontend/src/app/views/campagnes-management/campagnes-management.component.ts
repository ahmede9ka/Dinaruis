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
  user:any;
  constructor(private campagneService: CampagneService) {}

  ngOnInit() {
    const userData = localStorage.getItem('user');
    this.token = localStorage.getItem('token');
    
    if (userData) {
      this.user = JSON.parse(userData);
      this.fetchCampagnes();
    }
    
  }
  getStatusClass(status: string): string {
    const statusColors: { [key: string]: string } = {
      'Completed': 'bg-green-500',
      'Active': 'bg-blue-500',
      'Rejected': 'bg-red-500',
      'Pending': 'bg-yellow-500 text-gray-900'
    };
    return statusColors[status] || 'bg-gray-500'; // Default if status is unknown
  }
  getTypeClass(type: string): string {
    const typeBorders: { [key: string]: string } = {
      'buisness': 'border-blue-500 text-blue-500',
      'competitions': 'border-green-500 text-green-500',
      'Personal': 'border-yellow-500 text-yellow-500',
      'Corporate': 'border-red-500 text-red-500'
    };
    return typeBorders[type] || 'border-gray-500 text-gray-500'; // Default style
  }
  showToast(): void {
    
  }

  closeToast(): void {
    const toast = document.getElementById('toast');
    if (toast) {
      toast.classList.add('hidden');
      toast.classList.remove('flex');
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
  activate(id:any){
    this.campagneService.updateCampaign(id,{"status":"Active"},this.token).subscribe((data:any)=>{
      console.log(data);
    })
    const toast = document.getElementById('toast');
    const toastSuccess = document.getElementById('toast-success');
    
    if (toast && toastSuccess) {
      // Show the toast
      toast.classList.remove('hidden');
      toast.classList.add('flex');
      
      // Automatically hide the toast after 3 seconds
      setTimeout(() => {
        toast.classList.add('hidden');
        toast.classList.remove('flex');
      }, 3000);
    }
  }
  delete(id:any){
    this.campagneService.deleteCampaign(id,this.token).subscribe((data:any)=>{
      console.log(data);
    })
    const toast = document.getElementById('toast2');
    const toastSuccess = document.getElementById('toast-success');
    
    if (toast && toastSuccess) {
      // Show the toast
      toast.classList.remove('hidden');
      toast.classList.add('flex');
      
      // Automatically hide the toast after 3 seconds
      setTimeout(() => {
        toast.classList.add('hidden');
        toast.classList.remove('flex');
      }, 3000);
    }
  }
}
