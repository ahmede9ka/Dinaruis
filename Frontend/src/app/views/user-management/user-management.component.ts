import { Component, AfterViewInit, Renderer2 } from '@angular/core';

declare const simpleDatatables: any;

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements AfterViewInit {
  private dataTable: any;

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    const tableElement = document.getElementById("search-table");
    if (tableElement && typeof simpleDatatables.DataTable !== 'undefined') {
      this.dataTable = new simpleDatatables.DataTable("#search-table", {
        searchable: true,
        sortable: true,
        perPage: 5
      });

      this.setupSearch();
      this.setupFilter();
    }
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
}
