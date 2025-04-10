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
  imports: [CommonModule, LucideAngularModule, FormsModule]
})
export class UserManagementComponent implements AfterViewInit, OnInit {
  icons = { Eye, Edit, Slash };
  token: any;
  users: any[] = [];
  filteredUsers: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 6;
  activeModal: string | null = null;
  isModalOpen = false;
  selectedUser: any = null;
  private dataTable: any;

  constructor(private renderer: Renderer2, private userservice: UsersService) {}

  ngOnInit() {
    this.token = localStorage.getItem("token");
    this.fetchUsers(); // Fetch users on initialization
  }

  ngAfterViewInit(): void {
    const tableElement = document.getElementById("search-table");
    if (tableElement && typeof simpleDatatables?.DataTable !== 'undefined') {
      this.dataTable = new simpleDatatables.DataTable(tableElement, {
        searchable: true,
        sortable: true,
        perPage: this.itemsPerPage
      });

      this.setupSearch();
      this.setupFilter();
    }
  }

  // Modal Logic
  openModal2(modal: string, user: any) {
    this.activeModal = modal;
    this.selectedUser = { ...user };
  }

  closeModal2() {
    this.activeModal = null;
    this.selectedUser = null;
  }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  // Fetch Users
  fetchUsers() {
    this.userservice.getAllUsers(this.token).subscribe((data: any) => {
      this.users = data.data || [];
      this.filteredUsers = [...this.users];
    });
  }

  // Update User (Real-Time Update in the UI)
  update(user: any) {
    this.userservice.updateUser(user._id, user, this.token).subscribe({
      next: (updatedUser: any) => {
        // Update the user in the local array
        this.users = this.users.map(u =>
          u._id === user._id ? { ...u, ...updatedUser } : u
        );
        // Also update the filtered users array
        this.filteredUsers = [...this.users];
        this.closeModal2(); // Close the modal after updating
      },
      error: (err) => {
        console.error('Error updating user:', err);
      }
    });
  }

  // Delete User (Real-Time Deletion in the UI)
  delete(user: any) {
    this.userservice.deleteUser(user._id, this.token).subscribe({
      next: () => {
        // Remove the user from the array
        this.users = this.users.filter(u => u._id !== user._id);
        // Also update the filtered users array
        this.filteredUsers = [...this.users];
        this.closeModal2(); // Close the modal after deleting
      },
      error: (err) => {
        console.error('Error deleting user:', err);
      }
    });
  }

  // Search Setup
  private setupSearch(): void {
    const searchInput = document.getElementById("search-input") as HTMLInputElement;
    if (searchInput) {
      this.renderer.listen(searchInput, 'input', (event) => {
        const query = (event.target as HTMLInputElement).value.toLowerCase();
        this.filteredUsers = this.users.filter(user =>
          user.name?.toLowerCase().includes(query) ||
          user.email?.toLowerCase().includes(query)
        );
        this.currentPage = 1;
      });
    }
  }

  // Filter Setup
  private setupFilter(): void {
    const filterSelect = document.getElementById("filter-category") as HTMLSelectElement;
    if (filterSelect) {
      this.renderer.listen(filterSelect, 'change', () => {
        const selected = filterSelect.value.toLowerCase();
        this.filteredUsers = selected
          ? this.users.filter(user => user.role?.toLowerCase() === selected)
          : [...this.users];
        this.currentPage = 1;
      });
    }
  }

  // Pagination logic
  get totalPages(): number {
    return Math.ceil(this.filteredUsers.length / this.itemsPerPage);
  }

  paginatedUsers(): any[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredUsers.slice(start, start + this.itemsPerPage);
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
}
