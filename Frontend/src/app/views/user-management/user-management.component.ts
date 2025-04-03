import { Component, AfterViewInit, Renderer2, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { CommonModule } from '@angular/common';
import { Eye, Edit, Slash, LucideAngularModule } from 'lucide-angular';
import { FormsModule } from '@angular/forms';

declare const simpleDatatables: any;

@Component({
  selector: 'app-user-management',
  standalone: true,
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css'],
  imports: [CommonModule,LucideAngularModule,FormsModule]
})
export class UserManagementComponent implements AfterViewInit, OnInit {
  private dataTable: any;
  icons = { Eye, Edit, Slash };
  token: any;
  users: any[] = [];
  currentPage: number = 1; // Initialize currentPage
  itemsPerPage: number = 6; // Set items per page
  activeModal: string | null = null;
  constructor(private renderer: Renderer2, private userservice: UsersService) {}
  

  openModal2(modalId: string) {
      this.activeModal = modalId;
  }

  closeModal2() {
      this.activeModal = null;
  }
  ngOnInit() {
    this.token = localStorage.getItem("token");
    this.fetchUsers(); // Fetch the users when component initializes
  }
  isModalOpen = false;

    openModal() {
        this.isModalOpen = true;
    }

    closeModal() {
        this.isModalOpen = false;
    }

  ngAfterViewInit(): void {
    const tableElement = document.getElementById("search-table");
    if (tableElement && typeof simpleDatatables.DataTable !== 'undefined') {
      this.dataTable = new simpleDatatables.DataTable("#search-table", {
        searchable: true,
        sortable: true,
        perPage: this.itemsPerPage
      });

      this.setupSearch();
      this.setupFilter();
    }
  }

  // Fetch all users
  fetchUsers() {
    this.userservice.getAllUsers(this.token).subscribe((data: any) => {
      console.log(data);
      this.users = data.data;
    });
  }

  // Setup search functionality
  private setupSearch(): void {
    const searchInput = document.getElementById("search-input") as HTMLInputElement;
    if (searchInput) {
      this.renderer.listen(searchInput, 'input', (event) => {
        this.dataTable.search((event.target as HTMLInputElement).value);
      });
    }
  }

  // Setup category filtering
  private setupFilter(): void {
    const filterSelect = document.getElementById("filter-category") as HTMLSelectElement;
    if (filterSelect) {
      this.renderer.listen(filterSelect, 'change', () => {
        const selectedCategory = filterSelect.value.toLowerCase();
        this.dataTable.rows().forEach((row: HTMLElement) => {
          const categoryCell = row.children[2] as HTMLElement;
          if (categoryCell) {
            const categoryText = categoryCell.innerText.toLowerCase();
            row.style.display = selectedCategory === "" || categoryText.includes(selectedCategory) ? "" : "none";
          }
        });
      });
    }
  }
  

  // Calculate total pages for pagination
  get totalPages(): number {
    return Math.ceil(this.users.length / this.itemsPerPage);
  }

  // Paginated users data
  paginatedUsers(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.users.slice(startIndex, endIndex);
  }

  // Navigate to the previous page
  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  // Navigate to the next page
  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }
}
