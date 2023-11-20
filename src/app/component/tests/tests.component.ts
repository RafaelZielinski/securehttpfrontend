import { Component } from '@angular/core';

@Component({
  selector: 'app-tests',
  templateUrl: './tests.component.html',
  styleUrls: ['./tests.component.css']
})
export class TestsComponent {
  totalItems: number = 50; // Total number of items to paginate
  itemsPerPage: number = 10; // Items to display per page
  currentPage: number = 1;
  totalPages: number;
  pageLimit: number = 10; // Number of pages to display in the window
  startPage: number = 1; // Start page of the current window

  ngOnInit(): void {
    this.calculateTotalPages()
    this.displayPageNumbers;
  }

  // Calculate the total number of pages
  calculateTotalPages() {
    this.totalPages = 10;
  }

  // Display a subset of pages within the current window
  displayPageNumbers() {
    console.log('Recalculating pages')
    const pageNumbers = [];
    for (let i = this.startPage; i <= Math.min(this.startPage + this.pageLimit - 1, this.totalPages); i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  }

  // Handle page navigation
  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updateWindow();
    }
  }

  // Update the current window of visible pages
  updateWindow() {
    this.startPage = Math.max(1, this.currentPage - Math.floor(this.pageLimit / 2));
  }

  // Go to the next window of pages
  nextWindow() {
    this.startPage += this.pageLimit;
    this.updateWindow();
  }

  // Go to the previous window of pages
  previousWindow() {
    this.startPage -= this.pageLimit;
    this.updateWindow();
  }
}
