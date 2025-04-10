import { Component, OnInit } from '@angular/core';
import { CampagneService } from '../../services/campagne.service';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Eye, Edit, CheckSquare, Archive, Trash } from 'lucide-angular';

@Component({
  selector: 'app-campagnes-management',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './campagnes-management.component.html',
  styleUrls: ['./campagnes-management.component.css']
})
export class CampagnesManagementComponent implements OnInit {
  token: string | null = null;
  icons = { Eye, Edit, CheckSquare, Archive, Trash };
  allElements: any[] = [];
  paginatedElementsArray: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 3;
  user: any;

  constructor(private campagneService: CampagneService) {}

  ngOnInit() {
    const userData = localStorage.getItem('user');
    this.token = localStorage.getItem('token');

    if (userData) {
      this.user = JSON.parse(userData);
      this.fetchCampagnes();
    }
  }

  fetchCampagnes() {
    if (this.token) {
      this.campagneService.getCampaigns(this.token).subscribe(
        (data: any) => {
          this.allElements = data?.data || [];
          this.updatePaginatedElements();
        },
        (error) => console.error('Error fetching campaigns:', error)
      );
    }
  }

  getStatusClass(status: string): string {
    const statusColors: { [key: string]: string } = {
      'Completed': 'bg-green-500',
      'Active': 'bg-blue-500',
      'Rejected': 'bg-red-500',
      'Pending': 'bg-yellow-500 text-gray-900'
    };
    return statusColors[status] || 'bg-gray-500';
  }

  getTypeClass(type: string): string {
    const typeBorders: { [key: string]: string } = {
      'buisness': 'border-blue-500 text-blue-500',
      'competitions': 'border-green-500 text-green-500',
      'Personal': 'border-yellow-500 text-yellow-500',
      'Corporate': 'border-red-500 text-red-500'
    };
    return typeBorders[type] || 'border-gray-500 text-gray-500';
  }

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
      this.updatePaginatedElements();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedElements();
    }
  }

  activate(id: any) {
    this.campagneService.updateCampaign(id, { status: 'Active' }, this.token).subscribe({
      next: (data: any) => {
        // Update local array
        this.allElements = this.allElements.map(element =>
          element._id === id ? { ...element, status: 'Active' } : element
        );
        this.updatePaginatedElements();

        this.showToast('toast');
      },
      error: (err) => console.error('Error activating campaign:', err)
    });
  }

  delete(id: any) {
    this.campagneService.deleteCampaign(id, this.token).subscribe({
      next: (data: any) => {
        // Remove deleted item
        this.allElements = this.allElements.filter(element => element._id !== id);

        // Go to previous page if current one becomes empty
        if ((this.currentPage - 1) * this.itemsPerPage >= this.allElements.length) {
          this.currentPage = Math.max(1, this.currentPage - 1);
        }

        this.updatePaginatedElements();
        this.showToast('toast2');
      },
      error: (err) => console.error('Error deleting campaign:', err)
    });
  }

  showToast(toastId: string): void {
    const toast = document.getElementById(toastId);
    if (toast) {
      toast.classList.remove('hidden');
      toast.classList.add('flex');
      setTimeout(() => {
        toast.classList.add('hidden');
        toast.classList.remove('flex');
      }, 3000);
    }
  }

  closeToast(): void {
    ['toast', 'toast2'].forEach(id => {
      const toast = document.getElementById(id);
      if (toast) {
        toast.classList.add('hidden');
        toast.classList.remove('flex');
      }
    });
  }
}
